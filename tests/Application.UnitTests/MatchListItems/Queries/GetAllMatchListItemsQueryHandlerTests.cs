using Application.Common.Interfaces;
using Application.Common.Models;
using Application.MatchListItems.Queries;
using FluentAssertions;
using Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static Application.MatchListItems.Queries.GetAllMatchListItemsQuery;

namespace Application.IntegrationTests.MatchListItems.Queries
{
    public class GetAllMatchListItemsQueryHandlerTests
    {
        [Fact]
        public async Task ShouldReturnMatchListItems()
        {
            //Arrange
            IMatchListItemsService matchListItemService = new MatchListItemsService();

            MatchListItem matchListItem = new MatchListItem { Id = Guid.NewGuid().ToString()};
            matchListItemService.AddMatchListItem(matchListItem);

            var handler = new GetAllMatchListItemsQueryHandler(matchListItemService);

            //Act
            List<MatchListItem> matchListItems = await handler.Handle(new GetAllMatchListItemsQuery(), CancellationToken.None);

            //Assert
            matchListItems.Should().NotBeNull();
            matchListItems.Should().HaveCount(1);
            matchListItems.First().Should().Be(matchListItem);
        }

        [Fact]
        public async Task ShouldReturnEmptyWhenListIsEmpty()
        {
            //Arrange
            var handler = new GetAllMatchListItemsQueryHandler(new MatchListItemsService());

            //Act
            List<MatchListItem> result = await handler.Handle(new GetAllMatchListItemsQuery(), CancellationToken.None);

            //Assert
            result.Should().BeEmpty();
        }
    }
}
