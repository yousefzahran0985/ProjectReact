import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "/image/logo.svg";
import { Link } from "react-router-dom";
import { useDataCart } from "../Context/ItemCartContext";
import { HashLink } from 'react-router-hash-link';
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const {itemsCart,wishlist } = useDataCart();
  const [scrolled, setScrolled] = useState(false);
  const [iconMenu, setIconMenu] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
    <header className={scrolled ? "active" : ""}>
      <div className="container">
        <div className="box1">
          <div className="logo">
            {/* التعديل 1: استخدام HashLink للوجو ليصعد لأول الصفحة بنعومة */}
            <HashLink smooth to="/#">
              <img src={logo} alt="Logo" />
            </HashLink>
          </div>

          <nav onClick={() => setIconMenu(false)} className={`displaySmall ${iconMenu ? "active" : ""}`}>
            <ul>
              <li>
                {/* التعديل 2: تحويل HOME لـ HashLink لضمان عمل الـ smooth scroll */}
                <HashLink smooth to="/#" className={location.pathname === "/" && (location.hash === "" || location.hash === "#contact") ? "active" : ""}>
                  <i className="fa-solid fa-house"></i> Home
                </HashLink>
              </li>

              <li>
                {/* التعديل 3: إضافة smooth لجميع روابط الـ Hash */}
                <HashLink smooth to="/#featured" className={location.hash === "#featured" ? "active" : ""}>
                  <i className="fa-solid fa-gem"></i> Featured
                </HashLink>
              </li>

              <li>
                <HashLink smooth to="/#offer" className={location.hash === "#offer" ? "active" : ""}>
                  <i className="fa-solid fa-tag"></i> Offer
                </HashLink>
              </li>

              <li>
                <Link to="/wishlist" className={location.pathname === "/wishlist" ? "active" : ""}>
                  <i className="fa-solid fa-heart"></i> Wishlist ({wishlist.length})
                </Link>
              </li>

              <li>
                <Link to="/shop" className={location.pathname === "/shop" ? "active" : ""}>
                  <i className="fa-solid fa-store"></i> Shop
                </Link>
              </li>

              <li>
                <Link to="/cart" className={`cart ${location.pathname === "/cart" ? "active" : ""}`}>
                  <span>
                    <i className="fa-solid fa-bag-shopping"></i> Cart ({itemsCart.length})
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="box2">
          {/* التعديل 4: تصحيح مسار الـ HashLink الخاص بـ Contact */}
          <HashLink smooth to="#contact" className={`my-button-style `}>
            CONTACT US
          </HashLink>
          
          <div className={`menu-toggle ${iconMenu ? "active" : ""}`} id="menuToggle" onClick={() => setIconMenu(!iconMenu)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;