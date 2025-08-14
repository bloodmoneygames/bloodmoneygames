export interface ISiteOptions {
    title: string;
    siteTitle: string;
    description: string;
    sweetcoreSettings: ISweetcoreSettings;
}

export interface ISweetcoreSettings {
    homepage: {
        iframe: string;
    },
    promo: {
        top: string;
        bottom: string;
        side: string;
    },
    footer: {
        copyright: string;
    };
}