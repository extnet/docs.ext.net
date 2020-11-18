var __DOCS_CONFIG__ = {
    version: "7.1.0",
    searchPlaceholder: "Search docs",
    searchHotkeys: ["/"],
    sidebarFilterPlaceholder: "Filter",
    toolbarFilterPlaceholder: "Filter",
    filterNotFoundMsg: 'No member names found containing the query "{query}"',
    maxHistoryItems: 15,
    scrollOffset: 20,
    access: [
        { value: "public", label: "Public" },
        { value: "private", label: "Private" },
        { value: "protected", label: "Protected" },
        { value: "readonly", label: "Read only" },
    ],
    sidebar: [
        {
            type: "page",
            path: "/",
            label: "Home",
            icon: "home",
            searchLabel: "home",
        },
        {
            type: "group",
            path: "/guides",
            label: "Guides",
            searchLabel: "guides",
            icon: "layers",
            open: true,
            children: [
                {
                    type: "page",
                    path: "/guides/getting_started/",
                    label: "Getting Started",
                    searchLabel: "getting started install",
                },
                {
                    type: "page",
                    path: "/guides/license_key_configuration/",
                    label: "License Key Configuration",
                    searchLabel:
                        "license lisense key config configuration setup",
                },
                {
                    type: "page",
                    path: "/guides/localization/",
                    label: "Localization",
                    searchLabel:
                        "localization i18n",
                },
            ],
        },
    ],
    toolbarLinks: [
        { id: "configs", label: "Configs" },
        { id: "properties", label: "Properties", shortLabel: "Props" },
        { id: "methods", label: "Methods" },
        { id: "events", label: "Events" },
    ],
    topnav: [
        { text: "Download", link: "https://ext.net/download" },
        { text: "Pricing", link: "https://ext.net/pricing" },
        { text: "Examples", link: "https://examples.ext.net/" },
        { text: "Forums", link: "https://forums.ext.net/" },
        { text: "Themes", link: "https://themes.ext.net/" },
    ],
};
