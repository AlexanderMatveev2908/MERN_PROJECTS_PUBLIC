import {
  handleChangeLoginForm,
  handleLogout,
  handleSubmit,
} from "../lib/user/login";

export const useUserVals = (state, dispatch) => {
  const { userState } = state;
  const { loginVals } = userState;

  // console.group("USER");
  // console.table(userState);
  // console.groupEnd();

  return {
    handleChangeLoginForm: (e) => handleChangeLoginForm(dispatch, e),

    handleSubmit: async (e) => handleSubmit(dispatch, loginVals, e),

    handleLogout: () => handleLogout(dispatch),

    ...userState,
  };
};
