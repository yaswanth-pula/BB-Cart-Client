import React, { useState } from "react";
import FilteredCatalouge from "../../organisms/FilteredCatalogue";
import ExploreCategory from "../../organisms/ExploreCategory";
import Catelogue from "../Catalogue";
import { useAuth0 } from "@auth0/auth0-react";
import { ProductType } from "../../../Types";

interface Props {
  handleAddCart: (product: ProductType) => void;
}

const Inventory: React.FC<Props> = ({ handleAddCart }) => {
  const { isAuthenticated } = useAuth0();
  const [showCatelogue, setShowCatelogue] = useState(true);
  const [exploreCategoryId, setExploreCategoryId] = useState("");

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "") setShowCatelogue(true);
    else {
      setExploreCategoryId(categoryId);
      setShowCatelogue(false);
    }
  };

  return (
    <>
      <ExploreCategory changeHandler={handleCategoryChange} />
      {showCatelogue ? (
        <Catelogue isUser={isAuthenticated} cartHandler={handleAddCart} />
      ) : (
        <FilteredCatalouge
          categoryId={exploreCategoryId}
          isUser={isAuthenticated}
          cartHandler={handleAddCart}
        />
      )}
    </>
  );
};

export default Inventory;
