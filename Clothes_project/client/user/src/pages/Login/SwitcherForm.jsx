import PropTypes from "prop-types";

const SwitcherForm = ({ setCurrStateForm, txt, loading }) => {
  return (
    <p
      onClick={setCurrStateForm}
      className={`cursor-pointer ${
        loading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {txt}
    </p>
  );
};

SwitcherForm.propTypes = {
  setCurrStateForm: PropTypes.func.isRequired,
  txt: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SwitcherForm;
