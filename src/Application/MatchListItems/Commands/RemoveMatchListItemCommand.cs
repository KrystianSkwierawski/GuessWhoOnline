using Application.Models;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Commands
{
    public class RemoveMatchListItemCommand : IRequest
    {
        public string Url { get; set; }
        public class RemoveMatchListItemHandler : IRequestHandler<RemoveMatchListItemCommand>
        {
            public async Task<Unit> Handle(RemoveMatchListItemCommand request, CancellationToken cancellationToken)
            {
                MatchListItem match = Application.Models.MatchListItems.Matches.FirstOrDefault(x => x.Url == request.Url);

                if (match != null)
                {
                    Application.Models.MatchListItems.Matches.Remove(match);
                }

                return Unit.Value;
            }
        }
    }
}
