import { axiosInstance } from "../../../constants/instances";
import { showToast } from "../../../utils/toast";
import { SET_FORM_LOADING } from "../../actionTypes/userActionTypes";

const asyncWrapperForm = (cb, fieldLoading, dispatch) => async (formData) => {
  try {
    dispatch({
      type: SET_FORM_LOADING,
      payload: { field: fieldLoading, status: true },
    });

    return await cb(formData);
  } catch (err) {
    console.dir(err);
    showToast(
      err.response?.data?.msg ||
        err.response?.data?.errors[0]?.msg ||
        err.message,
      "error"
    );
    throw err;
  } finally {
    dispatch({
      type: SET_FORM_LOADING,
      payload: { field: fieldLoading, status: false },
    });
  }
};

const register = async (formData) => {
  const {
    data: { token },
  } = await axiosInstance.post("/user/register", formData);
  return token;
};

export const registerAPI = (dispatch) =>
  asyncWrapperForm(register, "registerLoading", dispatch);

const login = async (formData) => {
  const {
    data: { token },
  } = await axiosInstance.post("/user/login", formData);
  return token;
};

export const loginAPI = (dispatch) =>
  asyncWrapperForm(login, "loginLoading", dispatch);
