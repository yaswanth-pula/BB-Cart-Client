import React, { useState } from "react";
import FilteredCategory from "../../organisms/FilteredCatalogue";
import ExploreCategory from "../../organisms/ExploreCategory";
import Catelogue from "../Catalogue";

const Inventory: React.FC = () => {
  const [showCatelogue, setShowCatelogue] = useState(true);
  const [exploreCategoryId, setExploreCategoryId] = useState("");

  const handleExploreChange = (categoryId: string) => {
    if (categoryId === "") setShowCatelogue(true);
    else {
      setExploreCategoryId(categoryId);
      setShowCatelogue(false);
    }
  };

  return (
    <>
      <ExploreCategory changeHandler={handleExploreChange} />
      {showCatelogue ? (
        <Catelogue />
      ) : (
        <FilteredCategory categoryId={exploreCategoryId} />
      )}
    </>
  );
};

export default Inventory;
