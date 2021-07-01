import { ApolloClient, InMemoryCache } from "@apollo/client";
const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
};

export default createApolloClient;
