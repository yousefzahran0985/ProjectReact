import React from "react";
import "./Footer.css";

import logo from "/image/logo.svg";

const Footer = () => {
  return (
    <footer>
      {/* Background shapes */}
      <img className="img3" src="/image/footer-shape-1.png" alt="footer shape" />
      <img className="img1" src="/image/footer-shape-3.png" alt="footer shape" />
      <img className="img2" src="/image/footer-shape-2.png" alt="footer shape" />

      <div className="container" id="contact">
        <div className="section1">
          {/* Info */}
          <div className="info">
            <img src={logo} alt="Logo" />
            <p>
              Main factor that sets us apart competition allows deliver a
              specialist business consultancy service applies its ranging
              experience
            </p>

            <div className="icons">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
          </div>

          {/* Contact */}
          <div className="contact">
            <h3>Contact info</h3>
            <div className="box1">
              <p>Neal St, London WC2H 9PR</p>
              <p>United Kingdom</p>
              <a href="#">info.shoppie@support.com</a>
              <a href="#">+xx xxx xxx xxx</a>
            </div>
          </div>

          {/* Subscribe */}
          <div className="subscribe">
            <h3>Subscribe newsletter</h3>
            <input type="text" placeholder="Enter your email address" />
            <button className="scpical_button">Subscribe</button>
          </div>
        </div>

        <div className="section2">
          <ul>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Pricing Plan</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>

          <ul>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="section3">
          <p>© 2026 Yousef-Zahran, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;