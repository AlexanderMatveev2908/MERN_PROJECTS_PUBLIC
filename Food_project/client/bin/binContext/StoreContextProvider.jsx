import PropTypes from "prop-types";
import { useStoreContext, StoreContext } from "../useStoreContext";

const StoreContextProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={useStoreContext()}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
