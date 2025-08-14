import { getClient } from '@/utils/lib/apollo-client';
import { QUERY_SITE_DATA, QUERY_SITE_SETTINGS, QUERY_SEO_DATA } from '@/utils/data/site';
import { ISiteOptions } from '../interfaces/siteoptions';

export async function getSiteoptions(): Promise<ISiteOptions> {
    const apolloClient = getClient();

    let siteData;
    let siteSettings;

    try {
        siteData = await apolloClient.query({
            query: QUERY_SITE_DATA,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(`[site][getSiteMetadata] Failed to query site data: ${err.message}`);
        }
        throw err;
    }

    const { generalSettings } = siteData?.data || {};
    let { title, description, language } = generalSettings;

    try {
        siteSettings = await apolloClient.query({
            query: QUERY_SITE_SETTINGS,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(`[site][getSiteMetadata] Failed to query site settings: ${err.message}`);
        }
        throw err;
    }

    const { sweetcoreSettings } = siteSettings?.data || {};

    const settings = {
        title,
        siteTitle: title,
        description,
        sweetcoreSettings
    };

    return settings;

}
