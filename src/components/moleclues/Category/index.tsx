import React from "react";
import Typography from "@material-ui/core/Typography";
import { CategoryType, ProductType } from "../../../Types";
import Product from "../../atoms/Product";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  categoryHeader: {
    marginTop: "2rem",
  },
  productsContainer: {
    display: "flex",
    marginBottom: "1.5rem",
  },
});

interface Props {
  payload: CategoryType;
  isUser: boolean;
  cartHandler: (product: ProductType) => void;
}

const Category: React.FC<Props> = ({ payload, isUser, cartHandler }) => {
  const styles = useStyles();
  return (
    <div>
      <Typography variant="h4" className={styles.categoryHeader}>
        {payload.name}
      </Typography>
      <hr />
      <div className={styles.productsContainer}>
        {payload.products.map((item: ProductType) => {
          return (
            <Product
              key={item.productId}
              product={item}
              isUser={isUser}
              cartHandler={cartHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
