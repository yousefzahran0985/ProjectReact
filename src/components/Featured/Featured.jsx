import "./Featured.css";
import { useDataCart } from "../Context/ItemCartContext";
import { useNavigate } from "react-router-dom";
import Product from "../Product";

const FeaturedProducts = () => {
  const navigateShop = useNavigate()
  const {dataJson} = useDataCart();
  return (
    <div className="featured_products section " id="featured">
      <div className="container">
        <h1 className="section_h1">Featured products</h1>

        <div className="products">
          {dataJson.filter(p =>p.rating >=4.8).slice(4,).map((product) => (
            <Product product={product} key={product.id}/>
          ))}
        </div>

        <button id="viewAll" className="scpical_button" onClick={() => navigateShop("/shop")}>
          View All Products
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;