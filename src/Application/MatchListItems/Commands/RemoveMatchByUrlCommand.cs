using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{
    public class RemoveMatchByUrlCommand : IRequest
    {
        public string Url { get; set; }
        public class RemoveMatchByUrlCommandHandler : IRequestHandler<RemoveMatchByUrlCommand>
        {
            IMatchListItemsService _matchListItemsService;

            public RemoveMatchByUrlCommandHandler(IMatchListItemsService matchListItemsService)
            {
                _matchListItemsService = matchListItemsService;
            }

            public async Task<Unit> Handle(RemoveMatchByUrlCommand request, CancellationToken cancellationToken)
            {
                _matchListItemsService.RemoveMatchByUrl(request.Url);

                return Unit.Value;
            }
        }
    }
}
