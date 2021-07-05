import React, { useEffect, useState, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Inventory from "../../organisms/Inventory";
import User from "../../organisms/User";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ApolloProvider } from "@apollo/client";
import Cart from "../../organisms/Cart";
import { ProductType } from "../../../Types";
import { addProductToStore } from "../../../services/localstore";
import createApolloClient from "../../../apollo";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Orders from "../../organisms/Orders";
import IconButton from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles({
  navBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1em 0",
  },
});

const App: React.FC = () => {
  const styles = useStyles();

  const { isLoading, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();
  const [authToken, setAuthToken] = useState<string>("");
  const [cartUpdate, setCartUpdate] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const genrateToken = async () => {
      const token = isAuthenticated
        ? await getAccessTokenSilently()
        : "GUEST_TOKEN";
      setAuthToken(token);
    };
    genrateToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const bbCartClient = useMemo(
    () => createApolloClient(authToken),
    [authToken]
  );

  const handleAddCart = (product: ProductType) => {
    addProductToStore(user?.sub || "", product);
    setCartUpdate(Date());
    setSnackBarMessage(`Added ${product.units} ${product.name} to Cart`);
    setShowSnackBar(true);
  };

  const handleViewOrders = () => {
    setShowOrders(true);
  };

  const handleInventory = () => {
    setShowOrders(false);
  };

  const handleSnackBarClose = () => {
    setShowSnackBar(false);
  };

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <ApolloProvider client={bbCartClient}>
        <Container maxWidth="md">
          <div className={styles.navBar}>
            <Typography variant="h3" onClick={handleInventory}>
              BB Cart
            </Typography>
            <IconButton onClick={handleInventory}>
              <HomeIcon color="primary" fontSize="large" />
            </IconButton>
            <Cart cartUpdate={cartUpdate} />
            {isAuthenticated && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleViewOrders}
              >
                My Orders
              </Button>
            )}
            <User />
          </div>
          <>
            {showOrders ? (
              <Orders />
            ) : (
              <Inventory handleAddCart={handleAddCart} />
            )}
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={showSnackBar}
              onClose={handleSnackBarClose}
              autoHideDuration={3000}
              message={snackBarMessage}
            />
          </>
        </Container>
      </ApolloProvider>
    </>
  );
};

export default App;
