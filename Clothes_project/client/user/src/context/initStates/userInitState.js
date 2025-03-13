export const userInitState = {
  token: localStorage.getItem("token") || "",

  currStateForm: "Login",
  registerVals: {
    firstName: "",
    email: "",
    password: "",
  },

  loginVals: {
    email: "",
    password: "",
  },

  registerLoading: false,
  loginLoading: false,
};
