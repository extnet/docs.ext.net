---
icon: globe
---
# Localization

Localization makes UI components more friendly by talking with users in language they speak.

!!!
Be sure to review the [Getting Started](getting_started.md) guide for details on how to setup a new project and tips on **Startup.cs** configuration.
!!!

## Configuration

1.  Ext.NET localization files are embedded resources, ensure hosting of embedded resources is enabled in **Startup.cs**. Ext.NET localization middleware must be enabled after `app.UseExtNetResources()` invocation (not necessarily as the next statement, so feel free to select the best place for it in the request pipeline).

```cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // ...

    // 1. Enable hosting of Ext.NET resources
    app.UseExtNetResources();

    // 2. Enable Ext.NET localization
    app.UseExtNetLocalization();

    // ...
}
```

2.  [!badge Optional] The `UseExtNetLocalization` method accepts a setup action for [RequestLocalizationOptions](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.requestlocalizationoptions) mimicking the signature of the standard [UseRequestLocalization](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.applicationbuilderextensions.userequestlocalization) method. Internally Ext.NET will resolve supported cultures and initialize the corresponding fields in a **RequestLocalizationOptions** instance. Feel free to customize it further, e.g.:

Read more about ASP.NET localization [here](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization).

```cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // ...

    // 1. Enable hosting of Ext.NET resources
    app.UseExtNetResources();

    // 2. Enable Ext.NET localization
    app.UseExtNetLocalization(config =>
    {
        // Override the default logic to support
        // a &quot;lang&quot; query string parameter only.
        config.RequestCultureProviders = new[]
        {
            new QueryStringRequestCultureProvider
            {
                UIQueryStringKey = &quot;lang&quot;
            }
        };
    });

    // ...
}
```

With the configuration above, the `lang` query string parameter can be used to control UI Culture:

![](/static/lang-param-sample.png)

### Per-page locale configuration

Ext.NET uses the [CultureInfo.CurrentUICulture](https://docs.microsoft.com/ru-ru/dotnet/api/system.globalization.cultureinfo.currentuiculture) for configuring UI components locale. However, UI Culture can be overridden using the `ExtResourceManager.Locale` property.

### Configuration using Tag Helper

#### Index.cshtml

```html
<head>
    <ext-resourceManager locale="de" />
</head>
```

### Configuration using a Resource Manager model

As any ohter Ext.NET model, Resource Manager instance can be bound to a `<ext-resourceManager />` tag. This way configuration can be implemented within the view model.

#### Index.cshtml

```html
<head>
    <ext-resourceManager model="Model.ResourceManager" />
</head>
```

#### Index.cshtml.cs

```cs
using Ext.Net.Core;

using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApplication1.Pages
{
    public class IndexModel : PageModel
    {
        public ExtResourceManager ResourceManager { get; set; }

        public IndexModel()
        {
            ResourceManager = new ExtResourceManager
            {
                Locale = "de"
            };
        }
    }
}
```

Any of configurations above will force Ext.NET to use a custom locale configured for that page. Values coming from Culture Providers configured in Localization middleware are ignored in this case (see below, `es` query string locale is not applied - `de` page locale is used instead).

![](/static/localization-sample.png)