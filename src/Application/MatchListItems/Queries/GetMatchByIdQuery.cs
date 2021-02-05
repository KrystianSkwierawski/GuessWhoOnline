using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Queries
{
    public class GetMatchByIdQuery : IRequest<MatchListItem>
    {
        public string Id { get; set; }
        public class GetMatchByIdQueryHandler : IRequestHandler<GetMatchByIdQuery, MatchListItem>
        {
            IMatchListItemsService _matchListItemsService;

            public GetMatchByIdQueryHandler(IMatchListItemsService matchListItemsService)
            {
                _matchListItemsService = matchListItemsService;
            }
            public async Task<MatchListItem> Handle(GetMatchByIdQuery request, CancellationToken cancellationToken)
            {
                return _matchListItemsService.GetMatchById(request.Id);
            }
        }
    }
}
