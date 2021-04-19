using Application.Common.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddSingleton<ICharactersService, CharactersService>();
            services.AddSingleton<IMatchListItemsService ,MatchListItemsService>();
            services.AddSignalR();

            return services;
        }
    }
}
