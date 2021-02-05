using MediatR;
using Microsoft.Extensions.DependencyInjection;
using NToastNotify;
using System.Reflection;

namespace Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddSignalR();
            services.AddMvc().AddNToastNotifyToastr(new ToastrOptions()
            {
                ProgressBar = false,
                PositionClass = ToastPositions.TopRight,
            });

            return services;
        }
    }
}
