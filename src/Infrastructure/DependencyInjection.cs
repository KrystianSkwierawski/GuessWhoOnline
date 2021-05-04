using Application.Common.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using NToastNotify;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {         
            services.AddMvc().AddNToastNotifyToastr(new ToastrOptions()
            {
                ProgressBar = false,
                PositionClass = ToastPositions.TopRight,
            });
            services.AddSingleton<ICharactersService, CharactersService>();
            services.AddSingleton<IMatchListItemsService ,MatchListItemsService>();
            services.AddSignalR();

            return services;
        }
    }
}
