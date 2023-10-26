﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using MSSqlRestApi.Models;

namespace MSSqlRestApi
{
    public class Program
    {
        public static int Main(string[] args)
        {
            // Initialize Serilog
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            try
            {
                Log.Information("*** REST API for SQL Server, Azure SQL Database and Azure SQL Data Warehouse.");
                TestSqlServerConnection();
                StartWebHost();
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "*** Host terminated unexpectedly, examine exception.");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        private static void TestSqlServerConnection()
        {             
            Log.Information("Testing connection to SQL Server");
            var ctx = new ServerContext();
            Log.Information("Test connection successful. SQL Server version: {0}", ctx.SmoServer.VersionString);
        }

        private static void StartWebHost()
        {
            Log.Information("Starting Web Host");
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseUrls("http://*:5000") // listen on port 5000 on all network interfaces
                .UseIISIntegration()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .UseSerilog()
                .Build();
            host.Run();
        }
    }
}

