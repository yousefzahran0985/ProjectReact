import "./App.css";
import FeaturedProducts from "./components/Featured/Featured";
import Hero from "./components/hero/hero";
import ProductsSection from "./components/Products/Products";
import Offer from "./components/Offer/Offer";
import Shop from "./components/Shop/Shop";
import Cart from "./components/cart/Cart";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wishlist from "./components/WishList/Wishlist";
import MainLayout from "./MainLayout";
import ErrorPage from "./ErrorPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ProductsSection />
                <FeaturedProducts></FeaturedProducts>
                <Offer />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>
    <Toaster position="top-center" reverseOrder={false}  containerClassName="my-toaster-container"/>
    </>
  );
}

export default App;
