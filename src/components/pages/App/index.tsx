import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Inventory from "../../organisms/Inventory";

const bbCartClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={bbCartClient}>
      <Container maxWidth="md">
        <>
          <Typography variant="h3">BB Cart</Typography>
          <Inventory />
        </>
      </Container>
    </ApolloProvider>
  );
};

export default App;
