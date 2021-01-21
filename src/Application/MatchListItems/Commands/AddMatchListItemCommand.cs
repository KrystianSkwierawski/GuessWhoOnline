using Domain.Models;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{
    public class AddMatchListItemCommand : IRequest
    {
        public MatchListItem Match { get; set; }
        public class AddMatchListItemCommandHandler : IRequestHandler<AddMatchListItemCommand>
        {
            public async Task<Unit> Handle(AddMatchListItemCommand request, CancellationToken cancellationToken)
            {
                Domain.Lists.MatchListItems.Matches.Add(request.Match);
                return Unit.Value;
            }
        }
    }
}
