import appConfig from '@/utils/lib/config';
import { getClient } from '@/utils/lib/apollo-client';

import { QUERY_ALL_CATEGORIES, QUERY_CATEGORY_BY_SLUG, QUERY_CATEGORY_SEO_BY_SLUG } from '@/utils/data/categories';
import {mapCategoryData, mapCategoryCardData, categoryPathBySlug} from "@/utils/helpers/categories";

/**
 * getAllCategories
 */

export async function getAllCategories() {
  const apolloClient = getClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_CATEGORIES,
  });

  const categories = data?.data.categories.edges.map(({ node = {} }) => node);

  return Array.isArray(categories) && categories.map(mapCategoryCardData);
}

/**
 * Get category data by slug
 */
export async function getCategoryBySlug(slug: string) {
  const apolloClient = getClient();
  const apiHost = new URL(appConfig.endpoint).host;

  let categoryData;
  let seoData;

  try {
    categoryData = await apolloClient.query({
      query: QUERY_CATEGORY_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(`[categories][getCategoryBySlug] Failed to query category data: ${err.message}`);
    }
    throw err;
  }

  if (!categoryData?.data.category) return { category: undefined };

  const category = mapCategoryData(categoryData?.data.category);

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (appConfig.seo === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_CATEGORY_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`[categories][getCategoryBySlug] Failed to query SEO plugin: ${err.message}`);
        console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      }
      throw err;
    }

    const { seo = {} } = seoData?.data?.category || {};

    category.seo = {
      title: seo.title,
      description: seo.metaDesc,
    };

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      category.seo.canonical = seo.canonical;
    }

    category.seo.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    category.seo.article = {
      author: category.seo.og.author,
      modifiedTime: category.seo.og.modifiedTime,
      publishedTime: category.seo.og.publishedTime,
      publisher: category.seo.og.publisher,
    };

    category.seo.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    category.seo.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    category,
  };
}

/**
 * getCategories
 */

export async function getCategories({ count }: {count?: number} = {}) {
  const categories = await getAllCategories();
  if (!categories) {
    return [];
  }

  return {
    categories: categories.slice(0, count),
  };
}
