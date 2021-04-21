using Application.CharacterNames.Queries;
using FluentAssertions;
using Infrastructure.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static Application.CharacterNames.Queries.GetCharacterNamesQuery;

namespace Application.UnitTests.CharacterNames.Queries
{
    public class GetCharacterNamesQueryHandlerTests
    {
        [Fact]
        public async Task ShouldReturnCharacterNames()
        {          
            //Arrange
            var handler = new GetCharacterNamesQueryHandler(new CharactersService());

            //Act
            List<string> characterNames = await handler.Handle(new GetCharacterNamesQuery(), CancellationToken.None);

            //Assert

            //The test result depends on the files in the characters folder.
            //Add some webp files to "Application.UnitTests\bin\Debug\net5.0\wwwroot\images\characters".
            characterNames.Should().NotBeNull();
            characterNames.Should().HaveCount(1);
            characterNames.First().Should().Be("test");
        }
    }
}
