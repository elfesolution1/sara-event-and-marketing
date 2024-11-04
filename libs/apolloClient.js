// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:1337/graphql", // Replace with your Strapi GraphQL endpoint
  cache: new InMemoryCache(),
});

export default apolloClient;
