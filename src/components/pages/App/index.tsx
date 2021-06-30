import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Inventory from "../../organisms/Inventory";
import User from "../../organisms/User";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
};

const App: React.FC = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    const genrateToken = async () => {
      const token = isAuthenticated
        ? await getAccessTokenSilently()
        : "GUEST_TOKEN";
      setAuthToken(token);
    };
    genrateToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <CircularProgress />;

  const bbCartClient = createApolloClient(authToken);

  return (
    <Container maxWidth="md">
      <>
        <Typography variant="h3">BB Cart</Typography>
        <User />
        <ApolloProvider client={bbCartClient}>
          <Inventory />
        </ApolloProvider>
      </>
    </Container>
  );
};

export default App;
