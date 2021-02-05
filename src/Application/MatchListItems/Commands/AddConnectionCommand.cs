using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{
    public class AddConnectionCommand : IRequest
    {
        public string Url { get; set; }
        public class AddConnectionCommandHandler : IRequestHandler<AddConnectionCommand>
        {
            IMatchListItemsService _matchListItemsService;

            public AddConnectionCommandHandler(IMatchListItemsService matchListItemsService)
            {
                _matchListItemsService = matchListItemsService;
            }
            public async Task<Unit> Handle(AddConnectionCommand request, CancellationToken cancellationToken)
            {
                _matchListItemsService.AddConnection(request.Url);

                return Unit.Value;
            }
        }
    }
}
