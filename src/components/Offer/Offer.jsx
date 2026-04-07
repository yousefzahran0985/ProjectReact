import React from "react";
import "./Offer.css";
import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <div className="service section" id="offer">
      <div className="container">
        <div className="box">
          <span>35% Off</span>
          <p>
            This is the main factor that sets us apart our competition and
            allows us deliver a specialist business consultancy service
          </p>
          <Link to="/shop" >
          <button className="scpical_button" >Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offer;