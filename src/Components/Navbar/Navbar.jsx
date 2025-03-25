import { React, useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [cartCount, setCartCount] = useState(getTotalCartItems());
  const [isBouncing, setIsBouncing] = useState(false);
  const [particles, setParticles] = useState([]);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  }

  useEffect(() => {
    const newCartCount = getTotalCartItems();
    if (newCartCount !== cartCount) {
      setIsBouncing(true);
      setCartCount(newCartCount);
      createFirecrackerEffect();

      setTimeout(() => {
        setIsBouncing(false);
        setParticles([]);
      }, 1000);
    }
  }, [getTotalCartItems, cartCount]);

    const createFirecrackerEffect = () => {
      const colors = ["#FFD700", "#FF4500", "#1E90FF"];
      const minRange = 30; // Minimum range in pixels
      const maxRange = 100; // Maximum range in pixels

      const newParticles = Array.from({ length: 10 }, (_, i) => {
        // Randomize x and y values within the min and max range
        const x = Math.random() * (maxRange - minRange) + minRange;
        const y = Math.random() * (maxRange - minRange) + minRange;

        return {
          id: i,
          // Randomize direction for both positive and negative values
          x: `${Math.random() < 0.5 ? '-' : ''}${x}px`,
          y: `${Math.random() < 0.5 ? '-' : ''}${y}px`,
          backgroundColor: colors[i % colors.length],
        };
      });

  setParticles(newParticles);
};

  return (
    <div className="navbar">
      <div className="first-layer">
        <div className="nav-logo">
          <div className="logo-container">
            <img src={logo} alt="Logo" />
          </div>
          <p>SHOPPER</p>
        </div>

        <div className="nav-login-cart">
          {localStorage.getItem('token') ?
            <button onClick={logoutHandler}>Logout</button> :
            <Link to="/login">
              <button>Login</button>
            </Link>
          }
          <div className="cart-icon-container">
            <Link to="cart">
              <img src={cart_icon} alt="Cart" className={isBouncing ? 'bounce' : ''} />
            </Link>
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="firecracker-particle"
                style={{
                  "--x": particle.x,
                  "--y": particle.y,
                  backgroundColor: particle.backgroundColor,
                }}
              ></div>
            ))}
            <div className="nav-cart-count">{cartCount}</div>
          </div>
        </div>
      </div>
      <div className="second-layer">
        <ul className="nav-menu">
          <li onClick={() => setMenu("shop")} className={menu === "shop" ? "active" : ""}>
            <Link to="/">Shop</Link>
            {menu === "shop" && <hr />}
          </li>
          <li onClick={() => setMenu("men")} className={menu === "men" ? "active" : ""}>
            <Link to="/men">Men</Link>
            {menu === "men" && <hr />}
          </li>
          <li onClick={() => setMenu("women")} className={menu === "women" ? "active" : ""}>
            <Link to="/women">Women</Link>
            {menu === "women" && <hr />}
          </li>
          <li onClick={() => setMenu("kids")} className={menu === "kids" ? "active" : ""}>
            <Link to="/kids">Kids</Link>
            {menu === "kids" && <hr />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
