import React from "react";
import { ProductType } from "../../../Types";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "inherit",
    maxWidth: "300px",
    margin: "0.5em",
    padding: "1rem",
  },
  textMargin: {
    margin: "0.25em 0",
  },
});

interface Props {
  product: ProductType;
}

const Product: React.FC<Props> = ({ product }) => {
  console.log(product);
  const styles = useStyles();
  return (
    <>
      <Card className={styles.cardContainer}>
        <img src={product.imageUrl} alt="item pic" />
        <Typography variant="subtitle1" className={styles.textMargin}>
          {product.name}
        </Typography>
        <Typography variant="subtitle2" className={styles.textMargin}>
          {product.units}
        </Typography>
        <Typography variant="subtitle2" className={styles.textMargin}>
          MRP: ₹{product.price}
        </Typography>
        <Button variant="contained" color="primary">
          + Add To Cart
        </Button>
      </Card>
    </>
  );
};

export default Product;
