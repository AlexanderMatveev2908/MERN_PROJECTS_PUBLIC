import PropTypes from "prop-types";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import Spinner from "../Spinner/Spinner";
import { useGlobal } from "../../hooks/useGlobal";
// import { useFood } from "../../hooks/useFood";

const FoodDisplay = ({ cat }) => {
  // const { food_list, foodLoading } = useFood();
  const { food_list, foodLoading } = useGlobal();

  return (
    <div id="food-display" className="food-display">
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {foodLoading ? (
          <Spinner style={{ minWidth: "200%" }} />
        ) : (
          food_list.map((item) => {
            if (cat === "All" || cat === item.category)
              return <FoodItem key={item._id} {...item} />;
          })
        )}
      </div>
    </div>
  );
};

FoodDisplay.propTypes = {
  cat: PropTypes.string.isRequired,
};
export default FoodDisplay;
