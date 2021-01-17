# License Key Configuration

An Ext.NET license key can be purchased online at [ext.net/pricing](https://ext.net/pricing).

A license key is required to run your Ext.NET app on any location other than your local development machine.

Once a license key has been purchased, you will be sent an email with a key included. To add the license key to your Ext.NET Classic project, two easy steps are required:

### Step 1 – Set LicenseKey

In your project root, at the same level as the **.csproj** file, do you have an **appsettings.json** file? If no, please create that file, then add the following `ExtNET` configuration section. Replace `your-license-key-here` with your actual license key string.

```json
{
    "ExtNET": {
        "LicenseKey": "your-license-key-here"
    }
}
```

If your project already has an **appsettings.json** file, the final content might look something like the following:

```json
{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    },
    "AllowedHosts": "*",
    "ExtNET": {
        "LicenseKey": "your-license-key-here"
    }
}
```

## Step 2 – CopyToOutputDirectory

Within your projects **.csproj** file, add the following section inside the `<Project>` node:

```xml
<ItemGroup>
    <None Update="appsettings.json">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
</ItemGroup>
```

The above section instructs the build process to copy the **appsettings.json** to your `/bin` folder during compilation. Your **appsettings.json** file should be deployed along side your projects compiled **.dll** files.

Your Ext.NET project should now run on any server.

<doc-alert type="danger" title="Please protect your license key">Do not commit to a public source code repository or share anywhere outside of your organization. It is your responsibility to protect your license key.</doc-alert>