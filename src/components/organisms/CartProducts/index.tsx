import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getCartItemsWithQuantity } from "../../../services/localstore";
import { useAuth0 } from "@auth0/auth0-react";
import { OrderItemType } from "../../../Types";

const CartProducts: React.FC = () => {
  const [cartItems, setCartItems] = useState<OrderItemType[]>([]);
  const { user } = useAuth0();

  useEffect(() => {
    let items = getCartItemsWithQuantity(user?.sub || "");
    setCartItems(items);
  }, [user]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" variant="head">
              SNO
            </TableCell>
            <TableCell align="center" variant="head">
              Product
            </TableCell>
            <TableCell align="center" variant="head">
              Units
            </TableCell>
            <TableCell align="center" variant="head">
              Price
            </TableCell>
            <TableCell align="center" variant="head">
              Quantity
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item: OrderItemType, index: number) => {
            return (
              <TableRow key={item.productId}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.units}</TableCell>
                <TableCell align="center">₹{item.price}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartProducts;
