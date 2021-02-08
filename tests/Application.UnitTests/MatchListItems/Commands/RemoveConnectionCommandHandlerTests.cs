using Application.Common.Interfaces;
using Application.Common.Models;
using Application.MatchListItems.Commands;
using FluentAssertions;
using Infrastructure.Services;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static Application.MatchListItems.Commands.RemoveConnectionCommand;

namespace Application.UnitTests.MatchListItems.Commands
{
    public class RemoveConnectionCommandHandlerTests
    {
        [Fact]
        public async Task ShouldRemoveConnection()
        {
            IMatchListItemsService matchListItemService = new MatchListItemsService();

            int startNumberOfConnections = new Random().Next();

            MatchListItem matchListItem = new MatchListItem
            {
                Url = Guid.NewGuid().ToString(),
                NumberOfConnections = startNumberOfConnections
            };
            matchListItemService.AddMatchListItem(matchListItem);

            var handler = new RemoveConnectionCommandHandler(matchListItemService);

            //Act
            await handler.Handle(new RemoveConnectionCommand { Url = matchListItem.Url }, CancellationToken.None);

            //Assert
            int numberOfConnections = matchListItemService.GetMatchById(matchListItem.Id).NumberOfConnections;

            int expectedNumberOfConnections = startNumberOfConnections - 1;
            numberOfConnections.Should().Be(expectedNumberOfConnections);
        }
    }
}
