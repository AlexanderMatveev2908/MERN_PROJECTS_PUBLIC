import { FoodContext, useFoodContextVal } from "./FoodContext";
import { PropTypes } from "prop-types";

const FoodContextProvider = ({ children }) => {
  return (
    <FoodContext.Provider value={useFoodContextVal()}>
      {children}
    </FoodContext.Provider>
  );
};

FoodContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodContextProvider;
