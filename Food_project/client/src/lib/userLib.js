import { toast } from "react-toastify";
import {
  clearFormAct,
  setLoadingAct,
  setValAct,
} from "./../hooks/useFormV2/formReducer/actionCreator";

export const handleChangeV0 = (e, currState, formDispatch) => {
  const { name, value, type, checked } = e.target;

  const val = type === "checkbox" ? checked : value;

  let formType;

  if (currState === "Sign Up") formType = "registerVals";
  else if (currState === "Login") formType = "loginVals";
  else if (currState === "orderVals") formType = "orderVals";

  formDispatch(setValAct(val, name, formType));
};

export const handleSubmitV0 = async (
  e,
  currState,
  formState,
  formDispatch,
  userInstance,
  setToken,
  setShowLogin
) => {
  e.preventDefault();

  const formType = "userForms";

  const formTypeLoading = "userLoading";

  const { registerVals, loginVals } = formState;

  // eslint-disable-next-line
  const { terms, ...vals } = registerVals;

  const formVals = currState === "Sign Up" ? { ...vals } : loginVals;

  const endpoint = currState === "Sign Up" ? "/register" : "/login";

  try {
    formDispatch(setLoadingAct(true, formTypeLoading));

    const res = await userInstance.post(endpoint, formVals);

    if (res.data?.ok) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      formDispatch(clearFormAct(formType));
      setShowLogin(false);
    }
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message);
  } finally {
    formDispatch(setLoadingAct(false, formTypeLoading));
  }
};
