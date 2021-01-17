# Getting Started

## Quick start

If you already have the [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core) version 3.1 or 5.0+ installed, run the following sequence of command line steps:

```sh
dotnet new -i Ext.NET.Templates  # Install dotnet templates
mkdir ExtDemo1                   # Make a new folder
cd ExtDemo1                      # Move into that new folder
dotnet new extnet                # Create a new Ext.NET app
dotnet watch run                 # Start the new web app
```

Within seconds, your new app should be available at [http://localhost:5000](http://localhost:5000/).

Here's a [Getting Started](https://youtu.be/0J1n_wyvQoU) video demonstrating how to install the Ext.NET Template and create a new web app using the above commands.

<doc-embed src="https://www.youtube.com/embed/0J1n_wyvQoU"></doc-embed>

## Installation options

There are several options for quickly creating new Ext.NET Classic projects by using Templates, the Visual Studio Extension, or adding Ext.NET to your project using NuGet packages.

1.  Install the `dotnet` templates ([details](#install-dotnet-cli-templates)), or
2.  Install the VSIX Extension for Visual Studio ([details](#install-vsix-visual-studio-extension)), or
3.  Add the NuGet packages to your project ([details](#add-using-nuget))

We'll run through each of these setup techniques, although which to choose will depend on your requirements and personal preference. We use the `dotnet` command-line templates and Visual Studio Templates almost exclusively, so it would be our recommendation to start with either of the first two options detailed below.

## Install `dotnet` CLI templates

With multi-platform support, including Windows and Mac OS, the `dotnet` CLI is a handy collection of tools for creating, compiling, running, and publishing .NET applications. With one simple command, Ext.NET can be installed into that toolbox.

We're making the assumption here that you already have .NET Core installed locally, but if not, download and install [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core) first. The `dotnet` CLI is installed automatically during that process.

With .NET Core installed on your local machine, open a **Command-Line** or Mac OS **Terminal** window, run the following command to install the Ext.NET Templates:

```sh
dotnet new --install Ext.NET.Templates
```

Two new project templates will be installed, `extnet` and `extnet-mvc`.

The `extnet` template will create a basic Razor Pages project with Ext.NET installed. The `extnet-mvc` template creates the same Ext.NET application but with an ASP.NET MVC (Model-View-Controller) project layout.

```
Templates                      Short Name    Language    Tags
--------------------------------------------------------------------------------
Ext.NET MVC Web App            extnet-mvc    [C#]        Ext.NET/Web/MVC
Ext.NET Razor Pages Web App    extnet        [C#]        Ext.NET/Web/Razor Pages
```

The next step is to create a new folder for your project and move into that folder:

```sh
mkdir Demo1
cd Demo1
```

With those few simple commands, we're now ready to create a new Ext.NET web app from our newly installed templates and open the app in a web browser.

```sh
dotnet new extnet
dotnet watch run
```

Your new Ext.NET project is now created and the localhost webserver is running.

The above `dotnet watch run` command will start a local webserver at [http://localhost:5000](http://localhost:5000). You can now view the app in a web browser and your new Ext.NET web app should be working correctly.

To view the new project source code, open the project in Visual Studio, or run the `code .` command to open with Visual Studio Code.

```sh
code .
```

For creating another new app, just create a new folder somewhere then run one command:

```sh
dotnet new extnet && dotnew watch run
```

Within seconds your new Ext.NET project is created and running on a local webserver.

### Tips

Do you already have the Ext.NET `dotnet` tools installed? Upgrading to the latest release of Ext.NET is oh so simple, just run the same command:

```sh
dotnet new --install Ext.NET.Templates
```

The templates can be removed by running the following command:

```sh
dotnet new --uninstall Ext.NET.Templates
```

The version number of your installed `dotnet` templates can be retrieved using:

```sh
dotnet new -u
```

## Install VSIX Visual Studio Extension

The VSIX project template installer is available from the Ext.NET [download](https://ext.net/download) page or the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=extnet.ExtNET). Running the installer will add the two Ext.NET project templates into your Visual Studio <kbd>File</kbd> > <kbd>New</kbd> > <kbd>Project...</kbd> menu.

Once installed, two new Project templates will be available in Visual Studio:

![VSIX create new project](https://ext.net/wp-content/uploads/vsix-create-new-project.png)

The Visual Studio project templates can also be installed from within Visual Studio using <kbd>Extensions</kbd> > <kbd>Manage Extensions</kbd>, then searching for `Ext.NET`. A few clicks and the new project templates will be available.

![VS manage extensions](https://ext.net/wp-content/uploads/vs-manage-extensions.png)

## Add using NuGet

[Ext.NET Classic](https://ext.net/) can be installed into your project using [NuGet](https://www.nuget.org/packages/ext.net.classic), although as outlined below, some manual configuration of your projects **Startup.cs** and **\_ViewImports.cshtml** files are required.

In general, the easiest way to get started is by installing the `dotnet` [Ext.NET Templates](#install-dotnet-cli-templates) or [VSIX installer](#install-vsix-visual-studio-extension) for Visual Studio (Windows only).

### NuGet

Install Ext.NET Classic NuGet [package](https://www.nuget.org/packages/ext.net.classic) using the NuGet CLI.

```sh
Install-Package Ext.NET.Classic
```

### dotnet CLI

Install Ext.NET Classic NuGet [package](https://www.nuget.org/packages/ext.net.classic) using the dotnet CLI.

```sh
dotnet add package Ext.NET.Classic
```

### Project setup

Within your ASP.NET Core web project, a few configuration options must be included.

After installing the **Ext.NET.Classic** package using NuGet or the `dotnet` CLI, please add the following individual `Ext.Net` related configurations within your projects **Startup.cs** file:

```cs
// 1. Add the following using statements:
using Ext.Net;
using Ext.Net.Core;
using Westwind.AspNetCore.LiveReload;

namespace Your_Namespace_Here
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Optional to include LiveReload service
            // See https://github.com/RickStrahl/Westwind.AspnetCore.LiveReload
            services.AddLiveReload();

            // 2. Register Ext.NET services
            services.AddExtNet();
            services.AddExtCharts();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Optional LiveReload
            if (env.IsDevelopment())
            {
                app.UseLiveReload();
            }

            // 3. Use Ext.NET resources
            //    To be added prior to app.UseStaticFiles()
            app.UseExtNetResources(config =>
            {
                if (env.IsDevelopment())
                {
                    config.UseDebug(true);
                }

                config.UseEmbedded();
                config.UseCharts();
                config.UseThemeSpotless();
            });

            // 4. Enable Ext.NET localization [not required]
            //    If included, localization will be handled automatically
            //    based on client browser preferences
            app.UseExtNetLocalization();

            app.UseStaticFiles();
            app.UseRouting();

            // 5. Ext.NET middleware
            //    To be added prior to app.UseEndpoints()
            app.UseExtNet(config =>
            {
                config.Theme = ThemeKind.Spotless;
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // If MVC
                endpoints.MapRazorPages();  // If Razor
            });
        }
    }
}
```

<doc-alert>Additional details for configuring `app.UseExtNetLocalization()` are available in the [Localization](../localization) guide.</doc-alert>

Your projects **\_ViewImports.cshtml** file requires the addition of a few items as well.

```html
@using Ext.Net
@using Ext.Net.Core
@using Ext.Net.HtmlHelpers
@using Ext.Net.HtmlHelpers.Charts

@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

@removeTagHelper Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper, Microsoft.AspNetCore.Mvc.Razor

@addTagHelper Ext.Net.TagHelpers.*, Ext.Net
@addTagHelper Ext.Net.TagHelpers.*, Ext.Net.Core
@addTagHelper Ext.Net.TagHelpers.*, Ext.Net.Charts
```

Once installed, you should now have access to all Ext.NET components, the entire Ext.NET API, and Intellisense.

Try adding a simple `<ext-button>` to a page:

```html
<ext-button text="Click Me!" handler="Ext.toast('Hello, world')" />
```

Check out the [download](https://ext.net/download) page for links to all installation options and previous releases.