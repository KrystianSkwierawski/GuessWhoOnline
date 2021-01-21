using Domain.Models;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Queries
{
    public class GetMatchListItemQuery : IRequest<MatchListItem>
    {
        public string Id { get; set; }
        public class GetMatchListItemQueryHandler : IRequestHandler<GetMatchListItemQuery, MatchListItem>
        {
            public async Task<MatchListItem> Handle(GetMatchListItemQuery request, CancellationToken cancellationToken)
            {
                MatchListItem o_match = null;

                MatchListItem match = Domain.Lists.MatchListItems.Matches.FirstOrDefault(x => x.Id == request.Id);
                if(match != null)
                {
                    o_match = match;
                }

                return o_match;
            }
        }
    }
}
