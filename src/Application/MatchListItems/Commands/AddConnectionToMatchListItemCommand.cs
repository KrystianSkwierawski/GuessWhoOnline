using Domain.Models;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{
    public class AddConnectionToMatchListItemCommand : IRequest
    {
        public string Url { get; set; }
        public class AddConnectionToMatchListItemCommandHandler : IRequestHandler<AddConnectionToMatchListItemCommand>
        {
            public async Task<Unit> Handle(AddConnectionToMatchListItemCommand request, CancellationToken cancellationToken)
            {
                MatchListItem match = Domain.Lists.MatchListItems.Matches.FirstOrDefault(x => x.Url == request.Url);

                if (match != null)
                {
                     Domain.Lists.MatchListItems.Matches.Remove(match);
                }

                return Unit.Value;
            }
        }
    }
}
