using Application.Common.Interfaces;
using Application.Common.Models;
using Application.MatchListItems.Queries;
using FluentAssertions;
using Infrastructure.Services;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static Application.MatchListItems.Queries.GetMatchByIdQuery;

namespace Application.UnitTests.MatchListItems.Queries
{
    public class GetMatchByIdQueryHandlerTests
    {
        [Fact]
        public async Task ShouldReturnMatchListItemById()
        {
            //Arrange
            IMatchListItemsService matchListItemService = new MatchListItemsService();

            MatchListItem matchListItem = new MatchListItem { Id = Guid.NewGuid().ToString() };
            matchListItemService.AddMatchListItem(matchListItem);

            var handler = new GetMatchByIdQueryHandler(matchListItemService);

            //Act
            MatchListItem result = await handler.Handle(new GetMatchByIdQuery { Id = matchListItem.Id}, CancellationToken.None);

            //Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(matchListItem.Id);
        }
    }
}
