import { useState } from "react";
import { useDataCart } from "../Context/ItemCartContext";
import Product from "../Product";

const Shop = () => {
  const [filterSelect, setFilterSelect] = useState("All");
  const { visibleCount, setVisibleCount, dataJson } = useDataCart();
  const [filteredSearch, setFilteredSearch] = useState("");
  const filteredData = dataJson.filter((item) => {
    return (
      item.title.toLowerCase().includes(filteredSearch.toLowerCase()) &&
      (filterSelect === "All" || item.category === filterSelect.toLowerCase())
    );
  });
  const nonOfferProducts = filteredData.filter((p) => !p.offer);
  return (
    <div className="featured_products section">
      <div className="container">
        <h1 className="section_h1">Offer 35%</h1>
        <div className="products">
          {dataJson
            .filter((p) => p.offer)
            .map((product) => (
              <Product product={product} key={product.id} />
            ))}
        </div>
        <h1 className="section_h1">All Products</h1>
        <div className="filter-section">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
              value={filteredSearch}
              onChange={(e) => setFilteredSearch(e.target.value)}
            />
          </div>

          <div className="categories">
            {["All", "Jacket", "Polo", "T-Shirt", "Pants", "Tank", "Vest"].map(
              (e, index) => (
                <button
                  key={index}
                  className={`category-btn ${filterSelect === e ? "active" : ""}`}
                  onClick={() => {
                    setFilterSelect(e);
                  }}
                >
                  {e}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="products">
          {nonOfferProducts.slice(0, visibleCount).map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
        {visibleCount < nonOfferProducts.length && (
          <button
            className="scpical_button"
            onClick={() => setVisibleCount((prev) => prev + 18)}
          >
            More Products <i className="fa-solid fa-chevron-down"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Shop;
