import { useDataCart } from "./Context/ItemCartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const handleRating = (rat) => {
  return [1, 2, 3, 4, 5].map((star, i) => {
    const diff = star - rat;

    if (diff <= 0) {
      return <i key={i} className="fa-solid fa-star"></i>;
    } else if (diff > 0 && diff <= 0.21) {
      return <i key={i} className="fa-solid fa-star"></i>;
    } else if (diff > 0.2 && diff <= 0.71) {
      return <i key={i} className="fa-solid fa-star-half-stroke"></i>;
    } else {
      return <i key={i} className="fa-regular fa-star"></i>;
    }
  });
};

const saveData = (del) => {
  // دالة وهمية تأخذ ثانية واحدة لتنتهي
  const myPromise = new Promise((resolve) => {
    setTimeout(() => resolve("success"), 1000);
  });
  del
    ? toast.promise(myPromise, {
        loading: `${del} product...`,
        success: `Product ${del} successfully!`,
        error: "Error",
      })
    : toast.promise(myPromise, {
        loading: `Adding product...`,
        success: `Product added successfully!`,
        error: "Error",
      });
};
const Product = ({ product }) => {
  const { itemsCart, setItemsCart, wishlist, toggleFavorite } = useDataCart();
  const isInWishlist = wishlist.some((fav) => fav.id === product.id);
  return (
    <div className="product" key={product.id}>
      <div className={`iconFavorite ${isInWishlist ? "active" : ""}`}>
        <i className="fa-solid fa-heart"></i>
      </div>
      {product.offer && (
        <div className="offerProduct">
          save ${product.oldPrice - product.price}
        </div>
      )}
      <img src={product.image} alt={product.title} />
      <Link to={`/product/${product.id}`}>
        <p className="hover-text-under">{product.title}</p>
      </Link>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <p style={{ display: "flex", gap: "3px" }}>
          {handleRating(product.rating)}
        </p>
        <p
          style={{
            padding: "3px 9px",
            width: "40px",
            textAlign: "center",
            backgroundColor: "#c0c0c08e",
          }}
        >
          {product.rating}
        </p>
      </div>
      <span>
        ${product.price.toFixed(2)}{" "}
        {product.oldPrice && (
          <span
            style={{
              color: "#818181",
              textDecoration: "line-through",
              marginLeft: "6px",
              
            }}
          >
            ${product.oldPrice}.00
          </span>
        )}
      </span>
      <div className="buttons">
        <button
          onClick={(e) => {
            e.preventDefault();
            saveData();
            const isExist = itemsCart.some(
              (item) => item.id === product.id && item.selectedSize === "M",
            );
            if (isExist) {
              const newCart = itemsCart.map((item) =>
                item.id === product.id && item.selectedSize === "M"
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              );
              setItemsCart(newCart);
            } else {
              setItemsCart((prev) => [
                ...prev,
                { ...product, quantity: 1, selectedSize: "M" },
              ]);
            }
          }}
        >
          <i className="fa-solid fa-bag-shopping"></i> Add to cart
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            const newFavoriteStatus = !isInWishlist;
            newFavoriteStatus ? saveData() : saveData("Deleted");
            toggleFavorite(product);
          }}
        >
          {isInWishlist ? (
            <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
          ) : (
            <i className="fa-regular fa-heart" style={{ color: "red" }}></i>
          )}
        </button>
        <Link to={`/product/${product.id}`}>
          <button>
            <i className="fa-regular fa-eye"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
