using Application.Common.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CharacterNames.Queries
{
    public class GetCharacterNamesQuery : IRequest<List<string>>
    {
        public class GetCharacterNamesQueryHandler : IRequestHandler<GetCharacterNamesQuery, List<string>>
        {
            ICharactersService _charactersService;

            public GetCharacterNamesQueryHandler(ICharactersService charactersService)
            {
                _charactersService = charactersService;
            }

            public async Task<List<string>> Handle(GetCharacterNamesQuery request, CancellationToken cancellationToken)
            {
                return _charactersService.GetCharacterNames();
            }
        }
    }
}
