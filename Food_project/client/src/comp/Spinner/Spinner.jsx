import PropTypes from "prop-types";
import "./Spinner.css";
const Spinner = ({ style }) => {
  return (
    <div style={{ ...style }} className="container">
      <div className="spinner"></div>
    </div>
  );
};

Spinner.propTypes = {
  style: PropTypes.object,
};
export default Spinner;
