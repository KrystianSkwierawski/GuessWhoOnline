using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{
    public class RemoveConnectionCommand : IRequest
    {
        public string Url { get; set; }
        public class RemoveConnectionCommandHandler : IRequestHandler<RemoveConnectionCommand>
        {
            IMatchListItemsService _matchListItemsService;

            public RemoveConnectionCommandHandler(IMatchListItemsService matchListItemsService)
            {
                _matchListItemsService = matchListItemsService;
            }
            public async Task<Unit> Handle(RemoveConnectionCommand request, CancellationToken cancellationToken)
            {
                _matchListItemsService.RemoveConnection(request.Url);

                return Unit.Value;
            }
        }
    }
}
