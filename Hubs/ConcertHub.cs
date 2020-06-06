using Mapster;
using Microsoft.AspNetCore.SignalR;
using ShareMusic.Hubs.HubModels;
using ShareMusic.Models;
using ShareMusic.Repositories;
using ShareMusic.ViewModels;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ShareMusic.Hubs
{
    public class ConcertHub : Hub
    {
        private RoomRepository _roomRepo;
        private ParticipantRepository _participantRepo;
        public ConcertHub(RoomRepository roomRepository, ParticipantRepository participantRepository)
        {
            _roomRepo = roomRepository;
            _participantRepo = participantRepository;
        }
        public async Task PressKey(string key)
        {
            await Clients.Others.SendAsync("KeyPressed", key);
        }

        public async Task LeaveKey(string key)
        {
            await Clients.Others.SendAsync("KeyLeaved", key);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            //get praticipant model by connection id
            var participant = await _participantRepo.FindByConnectionIdAsync(Context.ConnectionId);
            if (participant == null) return;
            //get room of participant
            var room = await _roomRepo.FindByIdAsync(participant.RoomId);
            if (room == null) return;
            // remove participant from the room
            await _participantRepo.RemoveAsync(participant, false);

            var activeParticipants = await _participantRepo
                .GetAsync(p => p.RoomId == room.Id);
            //check if there are participants in the room
            if (!activeParticipants.Any())
            {
                await _participantRepo.SaveChangesAsync();
                //if there are no participants in the room, remove room
                await _roomRepo.RemoveAsync(room);
                return;
            }

            var players = activeParticipants
                .Where(p => p.ParticipantType == ParticipantType.Player)
                .AsEnumerable();
            //check if there are players in the room
            if (!players.Any())
            {
                //send "Leave Command" for all participants in the room
                //command means that everyone in this room must leave it
                await Clients.Group(room.Name).SendAsync("LeaveCommand");
            }
            else
            {
                await Clients.Group(room.Name).SendAsync("Leave", participant.Adapt<ParticipantViewModel>());
            }
            await _participantRepo.SaveChangesAsync();
        }

        public async Task EnterRoom(EnterRoomModel enterRoomModel)
        {
            if (enterRoomModel == null)
            {
                await Clients.Caller.SendAsync("Error", new { Error = "invalid_model" });
                return;
            }

            string confirmToken = null;
            //check token
            if (enterRoomModel.ParticipantType == ParticipantType.Player)
                confirmToken = await _roomRepo.GetPlayerTokenByIdAsync(enterRoomModel.RoomId);
            else if (enterRoomModel.ParticipantType == ParticipantType.Listener)
                confirmToken = await _roomRepo.GetListenTokenByIdAsync(enterRoomModel.RoomId);

            //send error if participant`s type is invalid 
            if (confirmToken == null)
            {
                await Clients.Caller.SendAsync("Error", new { Error = "invalid_type" });
                return;
            }
            //send error if token is invalid
            if (confirmToken != enterRoomModel.Token)
            {
                await Clients.Caller.SendAsync("Error", new { Error = "invalid_token" });
                return;
            }
            //get room 
            var room = await _roomRepo.FindByIdAsync(enterRoomModel.RoomId);
            //send error if room doesn`t exist
            if (room == null) await Clients.Caller.SendAsync("Error", new { Error = "doesnt_exist" });
            //Get the players who are in the room now
            var participants = await _participantRepo.GetAsync(p => p.RoomId == room.Id && p.ParticipantType == ParticipantType.Player);
            //Delete the room if there are no players in it, and the waiting time for the first player has expired 
            if (!participants.Any() && room.FirstConnectionExpired < DateTime.Now)
            {
                await _roomRepo.RemoveAsync(room, false);
                await Clients.Caller.SendAsync("Error", new { Error = "doesnt_exist" });
                await _roomRepo.SaveChangesAsync();
                return;
            }

            //Add participant to the room
            await Groups.AddToGroupAsync(Context.ConnectionId, room.Name);
            var participant = new Participant
            {
                ConnectionId = Context.ConnectionId,
                RoomId = room.Id,
                ParticipantType = enterRoomModel.ParticipantType,
                Name = enterRoomModel.Name
            };
            await _participantRepo.CreateAsync(participant, false);
            await Clients.Group(room.Name).SendAsync("Join", participant.Adapt<ParticipantViewModel>());
            await _participantRepo.SaveChangesAsync();
        }
    }
}