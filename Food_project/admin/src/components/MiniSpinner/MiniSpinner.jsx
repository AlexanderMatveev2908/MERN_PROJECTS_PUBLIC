import PropTypes from "prop-types";
import "./MiniSpinner.css";
const MiniSpinner = ({ style }) => {
  return (
    <div style={{ ...style }} className="mini-cont">
      <div className="spinner"></div>
    </div>
  );
};

MiniSpinner.propTypes = {
  style: PropTypes.object,
};
export default MiniSpinner;
