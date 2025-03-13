export const setTokenHandler = (userState, action) => {
  const { token } = action.payload;

  if (!token) throw new Error("token missing " + action.type);

  localStorage.setItem("token", token);

  return {
    ...userState,
    token,
  };
};

export const setLogoutHandler = (userState) => {
  localStorage.removeItem("token");

  return {
    ...userState,
    token: "",
  };
};
