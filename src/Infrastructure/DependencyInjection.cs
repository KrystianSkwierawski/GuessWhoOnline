using Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using NToastNotify;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddSignalR();
            services.AddMvc().AddNToastNotifyToastr(new ToastrOptions()
            {
                ProgressBar = false,
                PositionClass = ToastPositions.TopRight,
            });
            services.AddTransient<IDateTime, MachineDateTime>();

            return services;
        }
    }
}
