import { getClient } from '@/utils/lib/apollo-client';

import {
    QUERY_ALL_PAGES_INDEX,
    QUERY_ALL_PAGES_ARCHIVE,
    QUERY_ALL_PAGES,
    QUERY_PAGE_BY_URI,
    QUERY_PAGE_SEO_BY_URI,
} from '@/utils/data/pages';
import {IPage, IPageCard} from "@/utils/interfaces/pages";
import {IQueryData} from "@/utils/interfaces/commons";
import appConfig from "@/utils/lib/config";
import {mapPostCardData} from "@/utils/helpers/posts";
import {mapPageCardData, mapPageData} from "@/utils/helpers/pages";

/**
 * pagePathBySlug
 */

export function pagePathBySlug(slug: string) {
    return `/${slug}`;
}

/**
 * getPageByUri
 */

export async function getPageByUri(uri: string): Promise<IPage | false> {
    const apolloClient = getClient();
    const apiHost: string = new URL(appConfig.endpoint).host;

    let pageData;
    let seoData;

    try {
        pageData = await apolloClient.query({
            query: QUERY_PAGE_BY_URI,
            variables: {
                uri,
            },
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(`[pages][getPageByUri] Failed to query page data: ${err.message}`);
        }
        throw err;
    }

    if (!pageData?.data.page) {
        return false
    };

    const page = [pageData?.data.page].map(mapPageData)[0];

    // If the SEO plugin is enabled, look up the data
    // and apply it to the default settings

    if (appConfig.seo === true) {
        try {
            seoData = await apolloClient.query({
                query: QUERY_PAGE_SEO_BY_URI,
                variables: {
                    uri,
                },
            });
        } catch (err) {
            if (err instanceof Error) {
                console.log(`[pages][getPageByUri] Failed to query SEO plugin: ${err.message}`);
                console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
            }
            throw err;
        }

        const { seo = {} } = seoData?.data?.page || {};

        page.seo = {
            title: seo.title,
            description: seo.metaDesc,
        };

        page.seo.title = seo.title;
        page.seo.description = seo.metaDesc;
        // page.seo.readingTime = seo.readingTime;

        // The SEO plugin by default includes a canonical link, but we don't want to use that
        // because it includes the WordPress host, not the site host. We manage the canonical
        // link along with the other metadata, but explicitly check if there's a custom one
        // in here by looking for the API's host in the provided canonical link

        if (seo.canonical && !seo.canonical.includes(apiHost)) {
            page.seo.canonical = seo.canonical;
        }

        page.seo.og = {
            author: seo.opengraphAuthor,
            description: seo.opengraphDescription,
            image: seo.opengraphImage,
            modifiedTime: seo.opengraphModifiedTime,
            publishedTime: seo.opengraphPublishedTime,
            publisher: seo.opengraphPublisher,
            title: seo.opengraphTitle,
            type: seo.opengraphType,
        };

        page.seo.robots = {
            nofollow: seo.metaRobotsNofollow,
            noindex: seo.metaRobotsNoindex,
        };

        page.seo.twitter = {
            description: seo.twitterDescription,
            image: seo.twitterImage,
            title: seo.twitterTitle,
        };
    }

    return page;
}

/**
 * getAllPages
 */

export async function getAllPages(options = {}): Promise<IPageCard[]> {
    const apolloClient = getClient();

    const data = await apolloClient.query({
        query: QUERY_ALL_PAGES,
    });

    const pages = data?.data.pages.edges.map(({ node = {} }) => node);

    return pages.map(mapPageCardData);
}

/**
 * getTopLevelPages
 */

export async function getTopLevelPages() {
    const pages = await getAllPages();

    const navPages = pages.filter(({ parent }) => parent === null);

    // Order pages by menuOrder
    navPages.sort((a, b) => parseFloat(a.menuOrder) - parseFloat(b.menuOrder));

    return navPages;
}
