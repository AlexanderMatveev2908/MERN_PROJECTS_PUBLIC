import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import PropTypes from "prop-types";

const ExploreMenu = ({ cat, setCat }) => {
  return (
    <div id="explore-menu" className="explore-menu">
      <h1>Explore our menu</h1>

      <p className="explore-menu-text">
        Chose from a diverse menu featuring a wide range of options. Our menu is
        designed to cater to all tastes and preferences. Our mission is to
        provide the best food possible at the best price. We are committed to
        serving our customers with the highest quality food and the lowest
        prices.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item) => {
          const { menu_name, menu_image } = item;
          return (
            <div
              onClick={() =>
                setCat((prev) => (prev === menu_name ? "All" : menu_name))
              }
              key={menu_name}
              className="explore-menu-list-item"
            >
              <img
                className={cat === menu_name ? "active" : ""}
                src={menu_image}
                alt={menu_image}
              />
              <p>{menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

ExploreMenu.propTypes = {
  cat: PropTypes.string.isRequired,
  setCat: PropTypes.func.isRequired,
};
export default ExploreMenu;
