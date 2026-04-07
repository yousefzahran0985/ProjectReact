import "./Cart.css";
import { useDataCart } from "../Context/ItemCartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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


export default function Cart() {
  const { itemsCart, setItemsCart } = useDataCart();
  const total = itemsCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const handelPlus = (id, size) => {
    saveData();
    setItemsCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  const handelMinus = (id, size) => {
    const item = itemsCart.find(i => i.id === id && i.selectedSize === size);
    if (item && item.quantity > 1) {
      saveData("removed");
      setItemsCart((prev) =>
        prev.map((item) =>
          item.id === id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      );
    }
  };
  const handleRemove = (id, size) => {
    saveData("Remove");
    setItemsCart((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedSize === size))
    );
  };
  return (
    <div className="product_section section">
      <div className="container">
        <h1 className="section_h1">Cart</h1>
        <div className="cart-scroll">
        <div className="title-cart">
          <ul>
            <li>
              <p>image</p>
            </li>
            <li>
              <p>name</p>
            </li>
            <li>
              <p>quantity</p>
            </li>
            <li>
              <p>price</p>
            </li>
            <li>
              <p>action</p>
            </li>
          </ul>
        </div>
        {itemsCart.length === 0 && 
        <div className="container">
          <h1
            style={{ textAlign: "center", color: "#cacaca", padding: "70px 0" }}
          >
            <i class="fa-solid fa-box-open"></i>Wow, such empty!
          </h1>
          
        </div>
        }
        <div className="products-cart">
          {itemsCart.map((product) => (
            <div className="product-cart" key={`${product.id}-${product.selectedSize}`}>
              <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              </Link>
              <div className="cart-product-info">
                <Link to={`/product/${product.id}`}>
                <p className="hover-text-under">{product.title}</p>
                </Link>
                <span className="cart-product-size">
                  Size: {product.selectedSize}
                </span>
              </div>
              <div className="quantity">
                <button className={`${product.quantity ===1? "notActiveMinus" : ""}`}
                  onClick={() => handelMinus(product.id, product.selectedSize)}
                  disabled={product.quantity === 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                {product.quantity}
                <button
                  onClick={() => handelPlus(product.id, product.selectedSize)}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <span style={{ color: "var(--bg-orange-crayola)" }}>
                {product.price}$
              </span>
              <button
                style={{ color: "red" }}
                className="buttonRemoveCart"
                onClick={() => handleRemove(product.id, product.selectedSize)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
        {itemsCart.length != 0 && 
        <div className="total-price">
          <div className="title">
            <h2>Total Price</h2>
            <h2>{total}$</h2>
          </div>
          <button>Place Order</button>
        </div>
        }
      </div>
    </div>
  );
}
