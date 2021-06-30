import React from "react";
import { useQuery } from "@apollo/client";
import { CATEGORY_BY_ID } from "../../../graphql";
import Category from "../../moleclues/Category";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ProductType } from "../../../Types";

interface Props {
  categoryId: String;
  isUser: boolean;
  cartHandler: (product: ProductType) => void;
}

const FilteredCatalouge: React.FC<Props> = ({
  categoryId,
  isUser,
  cartHandler,
}) => {
  const { loading, error, data } = useQuery(CATEGORY_BY_ID, {
    variables: {
      categoryId: categoryId,
    },
  });

  if (error) return null;
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Category
          isUser={isUser}
          key={data.categoryById.categoryId}
          payload={data.categoryById}
          cartHandler={cartHandler}
        />
      )}
    </>
  );
};

export default FilteredCatalouge;
