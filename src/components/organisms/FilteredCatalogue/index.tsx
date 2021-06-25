import React from "react";
import { useQuery } from "@apollo/client";
import { CATEGORY_BY_ID } from "../../../graphql";
import Category from "../../moleclues/Category";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  categoryId: String;
}

const FilteredCategory: React.FC<Props> = ({ categoryId }) => {
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
          key={data.categoryById.categoryId}
          payload={data.categoryById}
        />
      )}
    </>
  );
};

export default FilteredCategory;
