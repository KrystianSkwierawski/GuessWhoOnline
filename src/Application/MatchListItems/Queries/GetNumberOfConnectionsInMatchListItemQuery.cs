using Domain.Models;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Queries
{
    public class GetNumberOfConnectionsInMatchListItemQuery : IRequest<int>
    {
        public string Url { get; set; }
        public class GetNumberOfConnectionsInMatchListItemQueryHandler : IRequestHandler<GetNumberOfConnectionsInMatchListItemQuery, int>
        {
            public async Task<int> Handle(GetNumberOfConnectionsInMatchListItemQuery request, CancellationToken cancellationToken)
            {
                int o_numberOfConnections = 0;

                MatchListItem match = Domain.Lists.MatchListItems.Matches.ToList().FirstOrDefault(x => x.Url == request.Url);

                if (match != null)
                {
                    o_numberOfConnections = match.NumberOfConnections;
                }

                return o_numberOfConnections;
            }
        }
    }
}
