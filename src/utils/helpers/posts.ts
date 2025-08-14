import {IQueryData} from "@/utils/interfaces/commons";
import {IPost, IPostCard} from "@/utils/interfaces/posts";

/**
 * postPathBySlug
 */

export function postPathBySlug(slug: string) {
  return `/games/${slug}`;
}

/**
 * Build Post card data
 */
export function mapPostCardData(postData: IQueryData = {}): IPostCard {
  const {
    databaseId,
    slug,
    title,
    categories,
    featuredImage,
    isSticky,
    likes
  } = postData;

  const post: IPostCard = {
    postId: databaseId,
    slug: slug,
    title: title,
    categories: [],
    isSticky: isSticky,
    likes: {
      up: likes.up,
      down: likes.down,
    }
  }

  // Clean up the categories to make them more easy to access
  if (postData.categories) {
    post.categories = categories.edges.map(({node}: { node: object }) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access

  if (postData.featuredImage) {
    post.featuredImage = featuredImage.node;
  }

  return post;
}

/**
 * Build single post data
 */

export function mapPostData(postData: IQueryData = {}): IPost {
  const {
    databaseId,
    slug,
    title,
    metaTitle,
    description,
    content,
    categories,
    csOptionsPost,
    featuredImage,
    isSticky,
    likes,
    rating
  } = postData;

  const post: IPost = {
    postId: databaseId,
    slug: slug,
    title: title,
    metaTitle: metaTitle,
    description: description,
    content: content,
    categories: [],
    csOptionsPost: csOptionsPost,
    isSticky: isSticky,
    likes: {
      up: likes.up,
      down: likes.down,
    },
    rating: {
      count: rating.count,
      total: rating.total,
    }
  }

  // Clean up the categories to make them more easy to access
  if (postData.categories) {
    post.categories = categories.edges.map(({node}: { node: object }) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access

  if (postData.featuredImage) {
    post.featuredImage = featuredImage.node;
  }

  return post;
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt: string) {
  if (typeof excerpt !== 'string') {
    throw new Error(`Failed to sanitize excerpt: invalid type ${typeof excerpt}`);
  }

  let sanitized = excerpt;

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, '&hellip;');

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace('....', '.');
  sanitized = sanitized.replace('.&hellip;', '.');

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, '');

  return sanitized;
}