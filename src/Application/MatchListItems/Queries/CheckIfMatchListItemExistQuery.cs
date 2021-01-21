using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MatchListItems.Queries
{
    public class CheckIfMatchListItemExistQuery : IRequest<bool>
    {
        public string Id { get; set; }
        public class CheckIfMatchListItemExistQueryHandler : IRequestHandler<CheckIfMatchListItemExistQuery, bool>
        {
            public async Task<bool> Handle(CheckIfMatchListItemExistQuery request, CancellationToken cancellationToken)
            {
                bool matchExist = (Application.Models.MatchListItems.Matches.FirstOrDefault(x => x.Id == request.Id) == null) ? false : true;
                return matchExist;
            }
        }
    }
}
