import "./Hero.css";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div className="hero">
      {/* Background shapes */}
      <img className="cicle" src="/image/hero-shape-2.png" alt="circle shape" />

      <div className="container">
        {/* Info section */}
        <div className="info">
          <span>$120.00</span>
          <h1>Man summer collection</h1>
          <p>
            This is the factor that sets us apart from competition and allows
            us deliver a specialist business service team applies its ranging
            experience determining
          </p>
          <Link to="/shop" >
            <button>SHOP NOW</button> 
          </Link>
        </div>

        {/* Hero image */}
        <div className="img_hero">
          <img src="/image/hero-banner.png" alt="Hero Banner" />
          <img className="star" src="/image/hero-shape-1.png" alt="star shape" />
        </div>
      </div>
      <div className=" container2">
        <p>
            This is the factor that sets us apart from competition and allows
            us deliver a specialist business service team applies its ranging
            experience determining
          </p>
          <Link to="/shop" >
            <button>SHOP NOW</button> 
          </Link>
      </div>
    </div>
  );
};

export default Hero;