using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Queries
{
    public class GetAllMatchListItemsQuery : IRequest<List<MatchListItem>>
    {      
        public class GetAllMatchListItemsQueryHandler : IRequestHandler<GetAllMatchListItemsQuery, List<MatchListItem>>
        {
            private readonly IMatchListItemsService _matchListItemsService;

            public GetAllMatchListItemsQueryHandler(IMatchListItemsService matchListItemsService)
            {
                _matchListItemsService = matchListItemsService;
            }
            public async Task<List<MatchListItem>> Handle(GetAllMatchListItemsQuery request, CancellationToken cancellationToken)
            {
                return _matchListItemsService.GetAll();
            }
        }
    }
}
