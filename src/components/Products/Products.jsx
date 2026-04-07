import "./Products.css";
import { useDataCart } from "../Context/ItemCartContext";
import Product from "../Product";

const ProductsSection = () => {
  const {dataJson} = useDataCart();
  return (
    <div className="product_section section" >
      <div className="container">
        <h1 className="section_h1">Explore new arrivals</h1>
        <div className="products">
          {dataJson.slice(18,21).map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;