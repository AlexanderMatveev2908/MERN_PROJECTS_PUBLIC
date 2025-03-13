import { toast } from "react-toastify";
import { REG_EMAIL, REG_PASSWORD } from "../../../constants/regex";
import { SET_TOKEN, SET_VAL_LOGIN } from "../../actionTypes/userActionTypes";
import { loginCall } from "../../api/loginCall";

export const handleChangeLoginForm = (dispatch, e) => {
  const { value: val, name: field } = e.target;

  dispatch({ type: SET_VAL_LOGIN, payload: { field, val } });
};

export const handleSubmit = async (dispatch, registerVals, e) => {
  e.preventDefault();

  if (!REG_EMAIL.test(registerVals.email))
    toast.error("Invalid email address format");
  else if (!REG_PASSWORD.test(registerVals.password))
    toast.error("Invalid password format");
  else {
    try {
      const { token } = await loginCall(registerVals);
      dispatch({ type: SET_TOKEN, payload: { token } });
    } catch (err) {
      toast.error(err.message);
    }
  }
};

export const handleLogout = (dispatch, err) => {
  dispatch({ type: SET_TOKEN, payload: { token: "" } });
  if (err) toast.error(err?.response?.data?.msg || err.message);
};
