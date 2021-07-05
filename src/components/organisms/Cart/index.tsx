import React, { useState, useEffect } from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getCartItemsWithQuantity,
  clearCartItems,
} from "../../../services/localstore";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CartProducts from "../../moleclues/CartProducts";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { OrderItemType } from "../../../Types";
import { useMutation } from "@apollo/client";
import { PLACE_USER_ORDER } from "../../../graphql";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
  },
});

interface Props {
  cartUpdate: string;
}

const Cart: React.FC<Props> = ({ cartUpdate }) => {
  const styles = useStyles();
  const { isAuthenticated, user } = useAuth0();
  const [cartItems, setCartItems] = useState<OrderItemType[]>([]);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [placeOrder, { error }] = useMutation(PLACE_USER_ORDER);
  const [afterOrderUpdate, setAfterOrderUpdate] = useState("");

  useEffect(() => {
    const items = getCartItemsWithQuantity(user?.sub || "");
    setCartItems(items);
  }, [cartUpdate, user, afterOrderUpdate]);

  const handleClickOpen = () => {
    setCartDialogOpen(true);
  };

  const handleClose = () => {
    setCartDialogOpen(false);
  };

  const handlePlaceOrder = async () => {
    const finalOrder = {
      orderId: Date.now(),
      products: cartItems,
    };
    await placeOrder({ variables: { userOrder: JSON.stringify(finalOrder) } });
    if (error) console.log(error);
    clearCartItems(user?.sub || "");
    handleClose();
    setAfterOrderUpdate(Date());
  };

  if (!isAuthenticated) return null;
  return (
    <>
      <div className={styles.header}>
        <Typography variant="h6">Cart</Typography>
        <IconButton onClick={handleClickOpen}>
          <Badge badgeContent={cartItems.length} color="primary">
            <ShoppingCartIcon fontSize="large" color="secondary" />
          </Badge>
        </IconButton>
      </div>
      <Dialog
        open={cartDialogOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Your BB Cart</DialogTitle>
        {cartItems.length === 0 ? (
          <>
            <DialogContent>
              <Typography variant="h6">
                Cart is Empty, Add Some Items..
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <CartProducts cartItems={cartItems} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              <Button
                onClick={handlePlaceOrder}
                color="primary"
                variant="contained"
              >
                Place Order
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Cart;
