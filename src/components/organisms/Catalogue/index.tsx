import React from "react";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
import { CATELOUGE } from "../../../graphql";
import Category from "../../moleclues/Category";
import { CategoryType, ProductType } from "../../../Types";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  isUser: boolean;
  cartHandler: (product: ProductType) => void;
}

const Catelogue: React.FC<Props> = ({ isUser, cartHandler }) => {
  const { loading, error, data } = useQuery(CATELOUGE);

  if (error)
    return <Typography variant="h3">Internal Server Error 500</Typography>;

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        data.allCategories.map(
          (currentCategory: CategoryType): JSX.Element => (
            <Category
              isUser={isUser}
              key={currentCategory.categoryId}
              payload={currentCategory}
              cartHandler={cartHandler}
            />
          )
        )
      )}
    </div>
  );
};

export default Catelogue;
