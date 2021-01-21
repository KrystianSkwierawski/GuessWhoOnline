using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Characters.Queries
{
    public class GetCharacterNamesQuery : IRequest<List<string>>
    {
        public class GetCharacterNamesQueryHandler : IRequestHandler<GetCharacterNamesQuery, List<string>>
        {
            public async Task<List<string>> Handle(GetCharacterNamesQuery request, CancellationToken cancellationToken)
            {
                return Application.Models.Characters.CharacterNames;
            }
        }

    }
}
