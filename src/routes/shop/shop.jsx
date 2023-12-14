import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/produc-card/product-card";
import "./shop.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title, index) => {
        console.log(categoriesMap[title]);

        return (
          <div key={index} className="category-wrapper">
            <h1>{title}</h1>
            <div className="products-container">
              {categoriesMap[title].map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Shop;
