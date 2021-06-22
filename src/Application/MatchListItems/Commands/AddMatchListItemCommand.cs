using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{
    public class AddMatchListItemCommand : IRequest
    {
        public MatchListItem MatchListItem { get; set; }
        public class AddMatchListItemCommandHandler : IRequestHandler<AddMatchListItemCommand>
        {
            private readonly IMatchListItemsService _matchListItemsService;

            public AddMatchListItemCommandHandler(IMatchListItemsService matchListItemsService)
            {
                _matchListItemsService = matchListItemsService;
            }
            public async Task<Unit> Handle(AddMatchListItemCommand request, CancellationToken cancellationToken)
            {
                _matchListItemsService.AddMatchListItem(request.MatchListItem);

                return Unit.Value;
            }
        }
    }
}
