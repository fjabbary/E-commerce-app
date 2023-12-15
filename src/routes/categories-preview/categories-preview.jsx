import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {Object.keys(categoriesMap).map((title, index) => {
        return (
          <div key={index} className="category-wrapper">
            <CategoryPreview title={title} products={categoriesMap[title]} />
          </div>
        );
      })}
    </>
  );
};

export default CategoriesPreview;
