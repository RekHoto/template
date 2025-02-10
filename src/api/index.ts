import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api", // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});
