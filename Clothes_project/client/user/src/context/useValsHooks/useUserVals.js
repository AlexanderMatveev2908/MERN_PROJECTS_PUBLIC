import { useLocation, useNavigate } from "react-router-dom";
import { setCurrStateForm } from "../lib/user/currStateForm";
import {
  handleLogout,
  loginHandler,
  registerHandler,
} from "../lib/user/formPost";
import { handleChangeForm } from "./../lib/user/changeVals";

export const useUserVals = ({ state, dispatch }) => {
  const { userState } = state;
  const { currStateForm, registerVals, token, loginVals, ...userVals } =
    userState;

  const navigate = useNavigate();
  const location = useLocation();

  const { firstName: name, ...rest } = registerVals;
  const refactoredRegisterVals = { name, ...rest };

  return {
    setCurrStateForm: (updatedState) =>
      setCurrStateForm(dispatch, updatedState),

    handleChangeForm: (e) => handleChangeForm(dispatch, currStateForm, e),

    registerHandler: (e) =>
      registerHandler(dispatch, refactoredRegisterVals, navigate, e),
    loginHandler: (e) => loginHandler(dispatch, loginVals, navigate, e),
    handleLogout: () => handleLogout(dispatch, navigate, location.pathname),

    currStateForm,
    registerVals,
    loginVals,
    token,

    navigate,

    ...userVals,
  };
};
