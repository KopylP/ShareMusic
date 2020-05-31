using System;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using ShareMusic.Api.ApiErrors;
using ShareMusic.Extensions;
using ShareMusic.Models;
using ShareMusic.Repositories;
using ShareMusic.ViewModels;

namespace ShareMusic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        IRoomRepository _roomRepository;
        public RoomsController(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        /// <summary>
        /// Get room by id
        /// </summary>
        /// <param name="id">room id</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var room = await _roomRepository.FindByIdAsync(id);
            var roomModel = room.Adapt<RoomViewModel>();
            roomModel.OwnerGuid = null;
            return Ok(roomModel);
        }

        /// <summary>
        /// Create new room
        /// </summary>
        /// <param name="roomModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RoomViewModel roomModel)
        {
            if (roomModel == null || roomModel.Name == null)
                return StatusCode(500, new InternalServerError("A room model is null"));

            roomModel.Name = roomModel.Name.Trim();

            var existRoom = await _roomRepository.GetAsync(p => p.Name == roomModel.Name);

            if (existRoom.Any())
                return StatusCode(500, new InternalServerError("A room with the same name already exists"));

            var room = new Room
            {
                Name = roomModel.Name,
                ListenSald = Guid.NewGuid().ToString(),
                PlayingSald = Guid.NewGuid().ToString(),
                FirstConnectionExpired = DateTime.Now.AddMinutes(1),
                OwnerGuid = Guid.NewGuid().ToString()
            };
            await _roomRepository.CreateAsync(room);
            return Ok(room.Adapt<RoomViewModel>());
        }

        /// <summary>
        /// Obtaining a token to enter the room with the ability to listen and play.
        /// </summary>
        /// <param name="id">id of room</param>
        /// <param name="token">room owner token</param>
        /// <returns></returns>

        [HttpGet("{id}/token/play")]
        public async Task<IActionResult> PlayToken(int id, [FromQuery] string token)
        {
            var room = await _roomRepository.FindByIdAsync(id);
            if (room == null) return NotFound(new NotFoundError("Room not found"));
            if (room.OwnerGuid != token) return Unauthorized(new UnauthorizedError("You have no access to the room"));
            return Ok(new { token = $"{room.Name}{room.PlayingSald}".ComputeSha256Hash() });
        }

        /// <summary>
        /// Obtaining a token to enter the room with the ability to only listen.
        /// </summary>
        /// <param name="id">id of room</param>
        /// <param name="token">room owner token</param>
        /// <returns></returns>
        [HttpGet("{id}/token/listen")]
        public async Task<IActionResult> ListenToken(int id, [FromQuery] string token)
        {
            var room = await _roomRepository.FindByIdAsync(id);
            if (room == null) return NotFound(new NotFoundError("Room not found"));
            if (room.OwnerGuid != token) return Unauthorized(new UnauthorizedError("You have no access to the room"));
            return Ok(new { token = $"{room.Name}{room.ListenSald}".ComputeSha256Hash() });
        }

    }
}