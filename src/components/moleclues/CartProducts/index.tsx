import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { OrderItemType } from "../../../Types";

interface Props {
  cartItems: OrderItemType[];
}

const CartProducts: React.FC<Props> = ({ cartItems }) => {
  const tableHeadersTitles: string[] = [
    "SNO",
    "Product",
    "Units",
    "Price",
    "Quantity",
  ];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadersTitles.map((title) => (
              <TableCell align="center" variant="head" key={title}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item: OrderItemType, index: number) => {
            return (
              <TableRow key={item.productId}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.units}</TableCell>
                <TableCell align="center">{`₹ ${item.price}`}</TableCell>
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
