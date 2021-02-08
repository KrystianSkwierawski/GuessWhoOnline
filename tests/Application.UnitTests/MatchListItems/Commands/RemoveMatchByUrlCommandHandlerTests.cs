using Application.Common.Interfaces;
using Application.Common.Models;
using Application.MatchListItems.Commands;
using FluentAssertions;
using Infrastructure.Services;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static Application.MatchListItems.Commands.RemoveMatchByUrlCommand;

namespace Application.UnitTests.MatchListItems.Commands
{
    public class RemoveMatchByUrlCommandHandlerTests
    {
        [Fact]
        public async Task ShouldRemoveMatchListItem()
        {
            //Arrange
            IMatchListItemsService matchListItemService = new MatchListItemsService();

            MatchListItem matchListItem = new MatchListItem { Url = Guid.NewGuid().ToString()};

            var handler = new RemoveMatchByUrlCommandHandler(matchListItemService);

            //Act
            await handler.Handle(new RemoveMatchByUrlCommand { Url = matchListItem.Url }, CancellationToken.None);

            //Assert
            MatchListItem result = matchListItemService.GetMatchById(matchListItem.Id);
            result.Should().BeNull();
        }
    }
}
