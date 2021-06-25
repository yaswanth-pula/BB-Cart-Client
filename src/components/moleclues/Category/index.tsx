import React from "react";
import Typography from "@material-ui/core/Typography";
import { CategoryType, ProductType } from "../../../Types";
import Product from "../Product";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  categoryHeader: {
    // textAlign: "center",
    marginTop: "2rem",
  },
  productsContainer: {
    display: "flex",
    marginBottom: "1.5rem",
  },
});

interface Props {
  payload: CategoryType;
}

const Category: React.FC<Props> = ({ payload }) => {
  const styles = useStyles();
  return (
    <div>
      <Typography variant="h4" className={styles.categoryHeader}>
        {payload.name}
      </Typography>
      <hr />
      <div className={styles.productsContainer}>
        {payload.products.map((item: ProductType) => {
          return <Product key={item.productId} product={item} />;
        })}
      </div>
    </div>
  );
};

export default Category;
