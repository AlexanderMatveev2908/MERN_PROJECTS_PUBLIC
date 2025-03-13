import PropTypes from "prop-types";
import { FoodContext, useFoodContextVals } from "./useFoodContextVals";

export const FoodContextProvider = ({ children }) => (
  <FoodContext.Provider value={useFoodContextVals()}>
    {children}
  </FoodContext.Provider>
);

FoodContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodContextProvider;
