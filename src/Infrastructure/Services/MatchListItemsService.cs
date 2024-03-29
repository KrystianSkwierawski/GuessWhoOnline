﻿using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Validators;
using FluentValidation;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Services
{
    public class MatchListItemsService : IMatchListItemsService
    {
        private readonly List<MatchListItem> _matches;

        public MatchListItemsService()
        {
            _matches = new List<MatchListItem>();
        }

        public List<MatchListItem> GetAll()
        {
            return _matches;
        }

        public void RemoveEmptyMatches()
        {
            IEnumerable<MatchListItem> emptyMatches = _matches.Where(x => x.NumberOfConnections == 0);

            if (emptyMatches.Count() == 0)
                return;

            foreach (var emptyMatch in emptyMatches)
            {
                _matches.Remove(emptyMatch);
            }
        }

        public void AddMatchListItem(MatchListItem match)
        {
            new MatchListItemValidator().ValidateAndThrow(match);

            _matches.Add(match);
        }

        public void RemoveMatchByUrl(string url)
        {
            MatchListItem match = _matches.FirstOrDefault(x => x.Url == url);

            if (match is not null)
            {
                _matches.Remove(match);
            }
        }

        public MatchListItem GetMatchById(string id)
        {
            return _matches.FirstOrDefault(x => x.Id == id);
        }

        public void AddConnection(string url)
        {
            MatchListItem match = _matches.FirstOrDefault(x => x.Url == url);

            if (match is not null)
            {
                match.NumberOfConnections++;
            }
        }

        public void RemoveConnection(string url)
        {
            MatchListItem match = _matches.FirstOrDefault(x => x.Url == url);

            if (match is not null)
            {
                match.NumberOfConnections--;
            }
        }

        public int GetNumberOfConnections(string url)
        {
            int o_numberOfConnections = 0;

            MatchListItem match = _matches.FirstOrDefault(x => x.Url == url);

            if (match is not null)
            {
                o_numberOfConnections = match.NumberOfConnections;
            }

            return o_numberOfConnections;
        }
    }
}
