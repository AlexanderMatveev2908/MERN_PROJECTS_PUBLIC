export const setValHandler = (userState, action) => {
  const { field, val } = action.payload;

  if (!field || typeof val !== "string")
    throw new Error("invalid fields " + action.type);

  return {
    ...userState,
    loginVals: {
      ...userState.loginVals,
      [field]: val,
    },
  };
};

export const setTokenHandler = (userState, action) => {
  const { token } = action.payload;

  if (typeof token !== "string")
    throw new Error("invalid token " + action.type);

  if (!token) localStorage.removeItem("token");
  else localStorage.setItem("token", token);

  return {
    ...userState,
    token,
    loginVals: {
      email: "",
      password: "",
    },
  };
};
