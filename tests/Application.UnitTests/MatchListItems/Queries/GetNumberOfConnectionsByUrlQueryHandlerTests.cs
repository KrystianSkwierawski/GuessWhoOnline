using Application.Common.Interfaces;
using Application.Common.Models;
using Application.MatchListItems.Queries;
using FluentAssertions;
using Infrastructure.Services;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static Application.MatchListItems.Queries.GetNumberOfConnectionsByUrlQuery;

namespace Application.UnitTests.MatchListItems.Queries
{
    public class GetNumberOfConnectionsByUrlQueryHandlerTests
    {
        [Fact]
        public async Task ShouldReturnNumberOfConnections()
        {
            //Arrange
            IMatchListItemsService matchListItemService = new MatchListItemsService();

            MatchListItem matchListItem = new MatchListItem { Url = Guid.NewGuid().ToString(), NumberOfConnections = 0 };
            matchListItemService.AddMatchListItem(matchListItem);

            int numberOfConnectionsToAdd = new Random().Next(0, 10);
            for (int i = 0; i < numberOfConnectionsToAdd; i++)
            {
                matchListItemService.AddConnection(matchListItem.Url);
            }

            var handler = new GetNumberOfConnectionsByUrlQueryHandler(matchListItemService);

            //Act
            int numberOfConnections = await handler.Handle(new GetNumberOfConnectionsByUrlQuery { Url = matchListItem.Url }, CancellationToken.None);

            //Assert
            numberOfConnections.Should().Be(numberOfConnectionsToAdd);
        }
    }
}
