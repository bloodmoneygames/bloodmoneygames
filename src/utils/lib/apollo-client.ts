import {
  DefaultOptions,
  HttpLink,
} from '@apollo/client';

import {
  registerApolloClient,
  InMemoryCache,
  ApolloClient,
} from "@apollo/experimental-nextjs-app-support";

import { removeLastTrailingSlash } from '@/utils/helpers/functions';
import appConfig from "@/utils/lib/config";

/**
 * getApolloClient
 */

export const { getClient, query, PreloadQuery } =
  registerApolloClient(() => _createApolloClient());

/**
 * createApolloClient
 */

export function _createApolloClient() {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
      notifyOnNetworkStatusChange: true
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(appConfig.endpoint),
    }),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true,
        },
      },
    }),
    defaultOptions: defaultOptions,
  });
}
