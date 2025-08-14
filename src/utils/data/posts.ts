import {gql} from '@apollo/client';

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    categories {
      edges {
        node {
          databaseId
          id
          name
          slug
        }
      }
    }
    featuredImage {
      node {
        altText
        caption
        sourceUrl
        srcSet
        sizes
        id
        mediaDetails {
          filteredSizes(sizes: ["post-thumbnail", "icon-thumb"]) {
              name
              sourceUrl
          }
        }
      }
    }
    databaseId
    date
    isSticky
    postId
    slug
    title
    likes {
      up
      down
    }
    rating {
      count
      total
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
  ${POST_FIELDS}
  query AllPostsIndex {
    posts(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_TOP_POSTS = gql`
  ${POST_FIELDS}
  query TopPosts {
    posts(first: 50, where: {topMeta: 1}) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_SIDE_POSTS = gql`
  ${POST_FIELDS}
  query SidePosts {
    posts(first: 50, where: {sideMeta: 1}) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_POST_BY_SLUG = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      categories {
        edges {
          node {
            databaseId
            id
            name
            slug
          }
        }
      }
      content
      date
      excerpt
      featuredImage {
        node {
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
        }
      }
      modified
      databaseId
      title
      slug
      isSticky
      csOptionsPost {
        flashFullwidth
        fieldGroupName
        flashBest
        flashFavorites
        flashIframe
        flashLink
        flashSide
        flashType
        shortDescription
      }
      rating {
        count
        total
      }
      likes {
        up
        down
      }
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID_INDEX = gql`
  ${POST_FIELDS}
  query PostsByCategoryId($categoryId: Int!) {
    posts(first: 10000, where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE = gql`
  ${POST_FIELDS}
  query PostsByCategoryId($categoryId: Int!) {
    posts(first: 10000, where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...PostFields
          excerpt
          featuredImage {
            node {
              altText
              sourceUrl(size: POST_THUMBNAIL)
              sizes
              id
            }
          }
          rating {
            count
            total
          }
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID = gql`
  ${POST_FIELDS}
  query PostsByCategoryId($categoryId: Int!) {
    posts(first: 10000, where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_POST_SEO_BY_SLUG = gql`
  query PostSEOBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;

export const QUERY_POST_PER_PAGE = gql`
  query PostPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;
