import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";
import { useFormV2 } from "../../hooks/useFormV2/useFormV2";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  const { handleChange, handleSubmit, userLoading, registerVals, loginVals } =
    useFormV2();

  return (
    <div className="login-popup">
      <form
        onSubmit={(e) => handleSubmit(e, currState)}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt={assets.cross_icon}
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              value={registerVals.name}
              onChange={(e) => handleChange(e, currState)}
              placeholder="your name..."
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={
              currState === "Sign Up" ? registerVals.email : loginVals.email
            }
            onChange={(e) => handleChange(e, currState)}
            placeholder="your email..."
            required
          />

          <input
            type="password"
            name="password"
            value={
              currState === "Sign Up"
                ? registerVals.password
                : loginVals.password
            }
            onChange={(e) => handleChange(e, currState)}
            placeholder="your password..."
            required
          />
        </div>

        <button type="submit">
          {userLoading
            ? "Loading..."
            : !userLoading && currState === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>
        {currState === "Sign Up" && (
          <div className="login-popup-condition">
            <input
              checked={registerVals.terms}
              onChange={(e) => handleChange(e, currState)}
              type="checkbox"
              name="terms"
              required
            />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        )}
        {currState === "Login" ? (
          <p>
            Don&apos;t have an&apos; Account?&nbsp;
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an&apos;account?&nbsp;
            <span onClick={() => setCurrState("Login")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
