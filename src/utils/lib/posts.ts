import {getClient} from '@/utils/lib/apollo-client';
import {sortObjectsByDate} from '@/utils/helpers/datetime';

import {
  QUERY_ALL_POSTS,
  QUERY_TOP_POSTS,
  QUERY_SIDE_POSTS,
  QUERY_POST_BY_SLUG,
  QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_POSTS_BY_CATEGORY_ID,
  QUERY_POST_SEO_BY_SLUG,
  QUERY_POST_PER_PAGE,
} from '@/utils/data/posts';
import {IPost, IPostCard} from "@/utils/interfaces/posts";
import appConfig from "@/utils/lib/config";
import {ICategoryCard} from "@/utils/interfaces/categories";
import {mapCategoryData} from "@/utils/helpers/categories";
import {mapPostData, mapPostCardData} from "@/utils/helpers/posts";

/**
 * getPostBySlug
 */

export async function getPostBySlug(slug: string) {
  const apolloClient = getClient();
  const apiHost = new URL(appConfig.endpoint).host;

  let postData;
  let seoData;

  try {
    postData = await apolloClient.query({
      query: QUERY_POST_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(`[posts][getPostBySlug] Failed to query post data: ${err.message}`);
    }
    throw err;
  }

  if (!postData?.data.post) return {post: undefined};

  const post = [postData?.data.post].map(mapPostData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (appConfig.seo) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_POST_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`[posts][getPostBySlug] Failed to query SEO plugin: ${err.message}`);
        console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      }
      throw err;
    }

    const {seo = {}} = seoData?.data?.post || {};

    post.seo = {
      title: seo.title,
      description: seo.metaDesc,
    };

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      post.seo.canonical = seo.canonical;
    }

    post.seo.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    post.seo.article = {
      author: post.seo.og.author,
      modifiedTime: post.seo.og.modifiedTime,
      publishedTime: post.seo.og.publishedTime,
      publisher: post.seo.og.publisher,
    };

    post.seo.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    post.seo.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    post,
  };
}

export async function getAllPosts(options = {}): Promise<IPostCard[]> {
  const apolloClient = getClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_POSTS,
    fetchPolicy: 'no-cache'
  });

  const posts = data?.data.posts.edges.map(({node = {}}) => node);

  return posts.map(mapPostCardData);
}


/**
 * Get side posts
 * Refactored
 */

export async function getSidePosts() {
  const apolloClient = getClient();

  const data = await apolloClient.query({
    query: QUERY_SIDE_POSTS,
  });

  const posts = data?.data.posts.edges.map(({node = {}}) => node);

  return {
    sidePosts: Array.isArray(posts) && posts.map(mapPostCardData),
  };
}

/**
 * getPostsByCategoryId
 */

export async function getPostsByCategoryId(categoryId: string): Promise<IPostCard[]> {
  const apolloClient = getClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: QUERY_POSTS_BY_CATEGORY_ID,
      variables: {
        categoryId,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(`[posts][getPostsByCategoryId] Failed to query post data: ${err.message}`);
    }
    throw err;
  }

  const posts = postData?.data.posts.edges.map(({node = {}}) => node);

  return posts.map(mapPostCardData);
}

/**
 * getPaginatedPostsByCategoryId
 */

export async function getPaginatedPostsByCategoryId(categoryId: string, currentPage: number = 1) {
  const posts = await getPostsByCategoryId(categoryId);
  const postsPerPage = await getPostsPerPage();
  const pagesCount = await getPagesCount(posts, postsPerPage);

  let page = Number(currentPage);

  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        pagesCount,
      },
    };
  }

  const offset = postsPerPage * (page - 1);
  const sortedPosts = sortStickyPosts(posts);
  return {
    posts: sortedPosts.slice(offset, offset + postsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
      basePath: '/'
    },
  };
}


/**
 * getRecentPosts
 */

export async function getRecentPosts({count, ...options}: {count: number}) {
  const posts = await getAllPosts(options);
  const sorted = sortObjectsByDate(posts);
  return {
    posts: sorted.slice(0, count),
  };
}


/**
 * getRelatedPosts
 */

export async function getRelatedPosts(
  categories: ICategoryCard[] | undefined,
  postId: string,
  count = 5
) {
  if (!Array.isArray(categories) || categories.length === 0) return;

  let related: {category: ICategoryCard, posts: IPostCard[]} = {
    category: mapCategoryData(categories && categories.shift()),
    posts: []
  };

  if (related.category) {
    const posts = await getPostsByCategoryId(
      related.category.id,
    );

    if (!posts) {
      return false;
    }

    const filtered = posts.filter(({postId: id}: {postId: string}) => id !== postId);
    const sorted = sortObjectsByDate(filtered);
    // related.posts = sorted.map((post) => ({ title: post.title, slug: post.slug }));

    if (Array.isArray(sorted) && sorted.length > count) {
      related.posts = sorted.slice(0, count);
    }
  }

  if (!Array.isArray(related.posts) || related.posts.length === 0) {
    const relatedPosts = await getRelatedPosts(categories, postId, count);
    related = relatedPosts || related;
  }

  if (Array.isArray(related.posts) && related.posts.length > count) {
    related.posts = related.posts.slice(0, count);
    return related;
  }

  return related;
}

/**
 * sortStickyPosts
 */

export function sortStickyPosts(posts: IPostCard[]) {
  return [...posts].sort((post) => (post.isSticky ? -1 : 1));
}

/**
 * getPostsPerPage
 */

export async function getPostsPerPage() {
  //If POST_PER_PAGE is defined at next.config.js
  if (appConfig.postsPerPage) {
    console.warn(
      'You are using the deprecated POST_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    appConfig.postsPerPage;
  }

  try {
    const apolloClient = getClient();

    const {data} = await apolloClient.query({
      query: QUERY_POST_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsPostsPerPage);
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Failed to query post per page data: ${err.message}`);
    }
    throw err;
  }
}

/**
 * getPageCount
 */

export async function getPagesCount(
  posts: IPostCard[],
  postsPerPage: number
) {
  const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
  return Math.ceil(posts.length / _postsPerPage);
}

/**
 * getPaginatedPosts
 */
export async function getPaginatedPosts(currentPage: number = 1) {
  const posts = await getAllPosts();
  const postsPerPage = await getPostsPerPage();
  const pagesCount = await getPagesCount(posts, postsPerPage);

  let page = Number(currentPage);

  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        pagesCount,
      },
    };
  }

  const offset = postsPerPage * (page - 1);
  const sortedPosts = sortStickyPosts(posts);
  return {
    posts: sortedPosts.slice(offset, offset + postsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}
