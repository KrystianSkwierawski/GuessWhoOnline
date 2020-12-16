using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class GameHub : Hub
    { 
        static List<HubCallerContext> _connections = new List<HubCallerContext>();

 
        public override async Task OnConnectedAsync()
        {
            _connections.Add(Context);
  
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            TryRemoveConnection();
           

            await base.OnDisconnectedAsync(exception);
        }

        private void TryRemoveConnection()
        {
            HubCallerContext connection = _connections.FirstOrDefault(x => x.UserIdentifier == Context.UserIdentifier);

            if (connection != null)
            {
                _connections.Remove(connection);
            }
        }
    }
}
