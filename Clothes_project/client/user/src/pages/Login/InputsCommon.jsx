import PropTypes from "prop-types";

const InputsCommon = ({ handleChangeForm, valEmail, valPassword }) => {
  return (
    <>
      <input
        type="email"
        name="email"
        onChange={handleChangeForm}
        value={valEmail}
        className="w-full  px-5 py-3 border border-gray-800 rounded-3xl outline-none"
        placeholder="Email..."
        required
      />

      <input
        type="password"
        name="password"
        onChange={handleChangeForm}
        value={valPassword}
        className="w-full  px-5 py-3 border border-gray-800 rounded-3xl outline-none"
        placeholder="Password..."
        autoComplete="off"
        required
      />
    </>
  );
};

InputsCommon.propTypes = {
  handleChangeForm: PropTypes.func.isRequired,
  valEmail: PropTypes.string.isRequired,
  valPassword: PropTypes.string.isRequired,
};

export default InputsCommon;
