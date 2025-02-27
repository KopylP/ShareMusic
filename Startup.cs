using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ShareMusic.Data;
using ShareMusic.Hubs;
using ShareMusic.Repositories;

namespace ShareMusic
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSignalR(o => {
                o.EnableDetailedErrors = true;
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("Policy", settings =>
                {
                    settings
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowAnyOrigin();
                    // .WithOrigins("http://localhost:3000/");
                });
            });
            services.AddDbContext<ApplicationContext>(options =>
            {
                string connection = Configuration.GetConnectionString("DefaultConnection");
                options.UseSqlite(connection);
            });

            services.AddScoped<RoomRepository>();
            services.AddScoped<ParticipantRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseRouting();

            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseCors("Policy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ConcertHub>("/concert");
                endpoints.MapControllers();
            });

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetService<ApplicationContext>();
                try 
                {
                    dbContext.Database.Migrate();
                }
                catch
                {
                    
                }
                
            }
        }
    }
}
