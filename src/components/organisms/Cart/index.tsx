import React, { useState, useEffect } from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAuth0 } from "@auth0/auth0-react";
import { getCartItemsFromStore } from "../../../services/localstore";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CartProducts from "../CartProducts";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ProductType } from "../../../Types";

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
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);

  useEffect(() => {
    const items = getCartItemsFromStore(user?.sub || "");
    setCartItems(items);
  }, [cartUpdate, user]);

  const handleClickOpen = () => {
    setCartDialogOpen(true);
  };

  const handleClose = () => {
    setCartDialogOpen(false);
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
        <DialogContent>
          <CartProducts />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
