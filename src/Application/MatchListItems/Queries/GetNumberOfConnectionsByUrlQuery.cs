using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Queries
{
    public class GetNumberOfConnectionsByUrlQuery : IRequest<int>
    {
        public string Url { get; set; }
        public class GetNumberOfConnectionsByUrlQueryHandler : IRequestHandler<GetNumberOfConnectionsByUrlQuery, int>
        {
            IMatchListItemsService _matchListItemsService;

            public GetNumberOfConnectionsByUrlQueryHandler(IMatchListItemsService matchListItemsService)
            {
                _matchListItemsService = matchListItemsService;
            }
            public async Task<int> Handle(GetNumberOfConnectionsByUrlQuery request, CancellationToken cancellationToken)
            {
                return _matchListItemsService.GetNumberOfConnections(request.Url);
            }
        }
    }
}
