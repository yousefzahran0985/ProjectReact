import { Outlet, useParams } from "react-router-dom";
import { useDataCart } from "./Context/ItemCartContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";

const handleRating = (rat) => {
  return [1, 2, 3, 4, 5].map((star, i) => {
    const diff = star - rat;

    if (diff <= 0) {
      return <i key={i} className="fa-solid fa-star"></i>;
    } else if (diff > 0 && diff <= 0.3) {
      return <i key={i} className="fa-solid fa-star"></i>;
    } else if (diff > 0.3 && diff <= 0.71) {
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


const ProductDetails = () => {
  const { itemsCart, setItemsCart,wishlist, dataJson ,toggleFavorite} = useDataCart();
  const { id } = useParams();
  const MyProduct = dataJson.find((p) => p.id === Number(id));
  const [choiceImage ,setChoiceImage] = useState(null)
  const [size, setSize] = useState("M");
  useEffect(() => {
    if (MyProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChoiceImage(MyProduct.image);
    }
  }, [MyProduct]);
  if (!MyProduct) {
    return <h2>Loading...</h2>;
    
  }
  const isInWishlist = wishlist.some((fav) => fav.id === MyProduct.id);
  return (
    <div className="section productDetails" style={{ flex: "1" }}>
      <div className="container" style={{ display: "flex", padding: "0 40px" ,gap: "40px",}}>
        <div className="foto" style={{ flex: "1", alignSelf: "center" }}>
          <img src={`${choiceImage}`} alt="" style={{ width: "100%" }} />
          
        </div>
        <div
          className="info"
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
          }}
        >
          <h2>{MyProduct.title}</h2>
          <h2>
            Product Description:
            <p
              style={{ fontSize: "16px", fontWeight: "200", color: "#474747" }}
            >
              {MyProduct.description}
            </p>
          </h2>
          {MyProduct.images && 
          <div className="smallFoto">
          {MyProduct.images.map((foto,i) => 
            <img src={`${foto}`} alt="" key={i} className={`${choiceImage === foto? "active":""}`} onClick={() => {
              setChoiceImage(foto)
            }}/>
          )}
          </div>}
          <div className="size">
          <h2 >Size: </h2>
            <ul>
              {["S","M","L","XL","2XL"].map((e ,i) => (
                <li key={i} onClick={() =>{setSize(e)} }className={`${size === e? "active":""}`}><p>{e}</p></li>
              ))}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Rating: </h2>
            <span style={{ fontSize: "19px" }}>
              {handleRating(MyProduct.rating)} {MyProduct.rating}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Price:</h2>{" "}
            <span style={{ fontSize: "19px" }}>
              ${MyProduct.price.toFixed(2)}{" "}
              {MyProduct.oldPrice && (
                <span
                  style={{
                    color: "#7c7c7c",
                    textDecoration: "line-through",
                    marginLeft: "6px",
                  }}
                >
                  ${MyProduct.oldPrice.toFixed(2)}
                </span>
              )}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              onClick={() => {
                saveData();
                const isExist = itemsCart.some(
                  (item) => item.id === MyProduct.id && item.selectedSize === size
                );
                if (isExist) {
                  const newCart = itemsCart.map((item) =>
                    item.id === MyProduct.id && item.selectedSize === size
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  );
                  setItemsCart(newCart);
                } else {
                  setItemsCart((prev) => [
                    ...prev,
                    { ...MyProduct, quantity: 1, selectedSize: size }, 
                  ]);
                }
              }}
            >
              Add To Cart
            </button>
            <button
              className="Add_to_Wishlist"
              onClick={(e) => {
                e.preventDefault();
                const newFavoriteStatus = !isInWishlist;
                newFavoriteStatus ? saveData():saveData("Deleted");
                toggleFavorite(MyProduct);
              }}
            >
              {isInWishlist ? "Remove from Wishlist " : "Add to Wishlist "}
            <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default ProductDetails;
