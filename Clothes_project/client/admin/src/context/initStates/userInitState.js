export const userInitState = {
  token: localStorage.getItem("token") || "",

  loginVals: {
    email: "",
    password: "",
  },
};
