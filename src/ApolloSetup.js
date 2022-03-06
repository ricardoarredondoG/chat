import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const wsLink = new WebSocketLink({
  uri: `ws://64.227.101.89/graphql/`,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'http://64.227.101.89/graphql/',
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  cache: new InMemoryCache(),
  link
});