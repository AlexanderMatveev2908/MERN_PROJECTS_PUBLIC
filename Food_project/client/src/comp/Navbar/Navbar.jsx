import "./Navbar.css";
import { useState } from "react";
import { assets } from "./../../assets/assets";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useGlobal } from "../../hooks/useGlobal";
const Navbar = ({ setShowLogin }) => {
  const [section, setSection] = useState("home");

  const { cartTotPrice, token, reset } = useGlobal();

  const handleLogout = () => {
    reset();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt={assets.logo} className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setSection("home")}
          className={section === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setSection("menu")}
          className={section === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setSection("mobile-app")}
          className={section === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setSection("contact us")}
          className={section === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt={assets.search_icon} />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt={assets.basket_icon} />
          </Link>
          <div className={cartTotPrice ? "dot" : ""}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt={assets.profile_icon} />
            <ul className="nav-profile-dropdown">
              <Link to="/orders">
                <img src={assets.bag_icon} alt={assets.bag_icon} />
                <p>Orders</p>
              </Link>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt={assets.logout_icon} />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
