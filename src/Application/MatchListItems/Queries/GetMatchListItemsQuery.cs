
using Application.Models;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Queries
{
    public class GetMatchListItemsQuery : IRequest<List<MatchListItem>>
    {
        public class GetMatchListItemsQueryHandler : IRequestHandler<GetMatchListItemsQuery, List<MatchListItem>>
        {
            public async Task<List<MatchListItem>> Handle(GetMatchListItemsQuery request, CancellationToken cancellationToken)
            {
                return Application.Models.MatchListItems.Matches;
            }
        }
    }
}
