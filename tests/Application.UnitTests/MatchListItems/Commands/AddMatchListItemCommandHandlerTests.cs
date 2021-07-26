﻿using Application.Common.Interfaces;
using Application.Common.Models;
using Application.MatchListItems.Commands;
using FluentAssertions;
using Infrastructure.Services;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static Application.MatchListItems.Commands.AddMatchListItemCommand;

namespace Application.UnitTests.MatchListItems.Commands
{
    public class AddMatchListItemCommandHandlerTests
    {
        [Fact]
        public async Task ShouldAddMatchListItem()
        {
            //Arrange
            IMatchListItemsService matchListItemService = new MatchListItemsService();

            MatchListItem matchListItem = new MatchListItem();

            var handler = new AddMatchListItemCommandHandler(matchListItemService);

            //Act
            await handler.Handle(new AddMatchListItemCommand { MatchListItem = matchListItem }, CancellationToken.None);

            //Assert
            MatchListItem result = matchListItemService.GetMatchById(matchListItem.Id);
            result.Should().NotBeNull();
            result.Should().Be(matchListItem);
        }
    }
}
