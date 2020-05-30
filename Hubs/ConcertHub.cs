using Microsoft.AspNetCore.SignalR;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace ShareMusic.Hubs
{
    public class ConcertHub : Hub
    {
        public async Task PressKey(string key) 
        {
            await Clients.Others.SendAsync("KeyPressed", key);
        }

        public async Task LeaveKey(string key) 
        {
            await Clients.Others.SendAsync("KeyLeaved", key);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Others.SendAsync("Notify", Context.ConnectionId);
            await base.OnConnectedAsync();
        }
    }
}