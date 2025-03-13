import { showToast } from "../../../utils/toast";
import { SET_CART_ITEMS } from "../../actionTypes/cartActionTypes";
import {
  CLEAN_VALS,
  LOGOUT,
  SET_TOKEN,
} from "../../actionTypes/userActionTypes";
import { loginAPI, registerAPI } from "../../api/user/submitForm";

const setTokenAndClean = async (dispatch, token, navigate) => {
  dispatch({ type: SET_TOKEN, payload: { token } });
  dispatch({ type: CLEAN_VALS });
  navigate("/");
};

export const registerHandler = async (dispatch, formData, navigate, e) => {
  e.preventDefault();
  try {
    const token = await registerAPI(dispatch)(formData);

    setTokenAndClean(dispatch, token, navigate);
    showToast("Registration successful", "success");
    // eslint-disable-next-line
  } catch (err) {
    // console.dir(err)
  }
};

export const loginHandler = async (dispatch, formData, navigate, e) => {
  e.preventDefault();
  try {
    const token = await loginAPI(dispatch)(formData);

    setTokenAndClean(dispatch, token, navigate);

    showToast("Login successful", "success");
    // eslint-disable-next-line
  } catch (err) {}
};

export const handleLogout = (dispatch, navigate, pathname) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: SET_CART_ITEMS, payload: { cartItems: {} } });

  if (pathname === "/") navigate("/login");
  else navigate("/");
};
