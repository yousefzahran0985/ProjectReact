import { useDataCart } from "../Context/ItemCartContext";
import "./WishList.css"
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const saveData = (del) => {
  const myPromise = new Promise((resolve) => {
    setTimeout(() => resolve("success"), 1000);
  });
  del? toast.promise(myPromise, {
    loading: `${del} product...`,
    success: `Product ${del} successfully!`,
    error: 'Error',
  }):toast.promise(myPromise, {
    loading: `Adding product...`,
    success: `Product added successfully!`,
    error: 'Error',
  })
};

const Wishlist = () => {
  const { itemsCart, setItemsCart, wishlist, toggleFavorite } = useDataCart();
  return (
    <div className="Wishlist section">
      <div className="container wishlist-scroll ">
        <ul>
          <li>PRODUCT</li>
          <li>PRICE</li>
          <li>ACTION</li>
        </ul>
        <div className="productsWhislist">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
          <div className="ProductWishlist" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={`${product.image}`} alt=""/>
            </Link>
            <Link to={`/product/${product.id}`}>
              <h4 className="hover-text-under">{product.title}</h4>
            </Link>
            <h4 className="price">{product.price}$</h4>
            <div className="action">
              <button className="addCart" 
              onClick={(e) => {
                  e.preventDefault();
                  saveData("Added")
                  if (itemsCart.some((item) => item.id === product.id && item.selectedSize === "M")) {
                    const newCart = itemsCart.map((item) =>
                    item.id === product.id && item.selectedSize === "M"
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  );
                    setItemsCart(newCart);
                  } else {
                    setItemsCart((prev) => [
                    ...prev,
                    { ...product, quantity: 1, selectedSize: "M" }
                  ]);
                  }
                }}
              >Add To Cart</button>
              <button className="RemoveWishlist" onClick={() => {
                  toggleFavorite(product);
                  saveData("Remove")
                }}
                >Remove</button>
            </div>
          </div>
          ))
          ) : (
            <h1 style={{ margin: "auto", color: "#cacaca", padding: "70px 0" }}>
              <i className="fa-solid fa-box-open"></i> Wow, such empty!
            </h1>
          )}
      </div>
      </div>
    </div>
  );
};

export default Wishlist;
