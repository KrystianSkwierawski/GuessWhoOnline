using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{

    public class RemoveEmptyMatchesCommand : IRequest
    {
        public class RemoveEmptyMatchesCommandHandler : IRequestHandler<RemoveEmptyMatchesCommand>
        {
            private readonly IMatchListItemsService _matchListItemsService;

            public RemoveEmptyMatchesCommandHandler(IMatchListItemsService context)
            {
                _matchListItemsService = context;
            }

            public async Task<Unit> Handle(RemoveEmptyMatchesCommand request, CancellationToken cancellationToken)
            {
                _matchListItemsService.RemoveEmptyMatches();

                return Unit.Value;
            }
        }
    }

}
