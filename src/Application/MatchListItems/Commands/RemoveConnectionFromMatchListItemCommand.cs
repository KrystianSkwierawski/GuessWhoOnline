using Application.Models;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{
    public class RemoveConnectionFromMatchListItemCommand : IRequest
    {
        public string Url { get; set; }
        public class RemoveConnectionFromMatchListItemHandler : IRequestHandler<RemoveConnectionFromMatchListItemCommand>
        {
            public async Task<Unit> Handle(RemoveConnectionFromMatchListItemCommand request, CancellationToken cancellationToken)
            {
                MatchListItem match = Application.Models.MatchListItems.Matches.FirstOrDefault(x => x.Url == request.Url);

                if (match != null)
                {
                    match.NumberOfConnections--;
                }

                return Unit.Value;
            }
        }
    }
}
