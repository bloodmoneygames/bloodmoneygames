import {IAppConfig} from "@/utils/interfaces/commons";

const exported = Boolean(process.env.NEXT_EXPORT) || false;
const wpEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT ? process.env.WORDPRESS_GRAPHQL_ENDPOINT : 'http://localhost:8080';
const postsPerPage = process.env.POSTS_PER_PAGE ? Number(process.env.POSTS_PER_PAGE) : false;
const seoEnabled = Boolean(process.env.WORDPRESS_PLUGIN_SEO) || false;

const env = process.env.NODE_ENV
if(env == "development"){

}

const appConfig: IAppConfig = {
  export: exported,
  development: (process.env.NODE_ENV == 'development'),
  endpoint: wpEndpoint,
  seo: seoEnabled,
  postsPerPage: postsPerPage,
}

export default appConfig;