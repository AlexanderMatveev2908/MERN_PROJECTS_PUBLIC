import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Footer.css";
const Footer = () => {
  return (
    <div id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt={assets.logo} />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque,
            esse! Eum nulla minima dolor rem. Animi aspernatur alias illo
            corporis, amet, laboriosam aperiam enim cumque iusto minus debitis
            molestias culpa.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt={assets.facebook_icon} />
            <img src={assets.twitter_icon} alt={assets.twitter_icon} />
            <img src={assets.linkedin_icon} alt={assets.linkedin_icon} />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <Link to="/">Home</Link>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+123 456 7890</li>
            <li>info@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; Copyright 2025 Tomato.com -All rights reserved.
      </p>
    </div>
  );
};
export default Footer;
