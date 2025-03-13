import "./Spinner.css";
import PropTypes from "prop-types";
const Spinner = ({ propStyle }) => {
  const defStyle = {
    border: "5px solid #222",
    borderTopColor: "lightgray",
    width: "200px",
    height: "200px",
  };

  const styleToApply = { ...defStyle, ...propStyle };

  return (
    <div className="spinner-container">
      <div style={styleToApply} className="spinner"></div>
    </div>
  );
};

Spinner.propTypes = {
  propStyle: PropTypes.object,
};

export default Spinner;
