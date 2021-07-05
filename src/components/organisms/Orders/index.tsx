import Typography from "@material-ui/core/Typography";
import React from "react";
import { useQuery } from "@apollo/client";
import { USER_ORDERS } from "../../../graphql";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Order, OrderItemType } from "../../../Types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  orderCard: {
    margin: "1em",
  },
});

const Orders: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(USER_ORDERS);
  const styles = useStyles();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (error)
    return <Typography variant="h3">500 Internal Server Error</Typography>;

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4">Orders</Typography>
      {data.userOrders.map((order: Order) => (
        <div className={styles.orderCard}>
          <Card>
            <CardContent>
              <Typography variant="body1">{`OrderId : ${order.orderId}`}</Typography>
              <Typography variant="body1">Products:</Typography>
              {order.products.map((product: OrderItemType) => (
                <Typography
                  variant="body2"
                  key={product.productId}
                >{`${product.quantity} X ${product.units} ${product.name}`}</Typography>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
};

export default Orders;
