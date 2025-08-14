import { gql } from '@apollo/client';

export const QUERY_SITE_DATA = gql`
  query SiteData {
    generalSettings {
      description
      language
      title
    }
  }
`;

export const QUERY_SITE_SETTINGS = gql`
  query SiteSettings {
    sweetcoreSettings {
      homepage {
        iframe
      }
      promo {
        top
        bottom
        side
      }
      footer {
        copyright
      }
    }
  }
`;

export const QUERY_SEO_DATA = gql`
  query SeoData {
    seo {
      webmaster {
        yandexVerify
        msVerify
        googleVerify
        baiduVerify
      }
      social {
        facebook {
            url
            defaultImage {
                mediaItemUrl
            }
        }
        instagram {
            url
        }
        linkedIn {
            url
        }
        mySpace {
            url
        }
        pinterest {
            url
            metaTag
        }
        twitter {
            cardType
            username
        }
        wikipedia {
            url
        }
        youTube {
            url
        }
        otherSocials
      }
    }
  }
`;
