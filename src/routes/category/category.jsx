import "./category.scss";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div>
      <h1>{category}</h1>
      <div className="products-list">
        {products &&
          products.map((item) => <ProductCard product={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Category;
