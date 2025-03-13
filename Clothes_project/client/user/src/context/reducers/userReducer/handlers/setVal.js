import { userInitState } from "../../../initStates/userInitState";

export const setValHandler = (userState, action) => {
  const { name, value, formToUpdate } = action.payload;

  if (!name || !formToUpdate || typeof value !== "string")
    throw new Error("Invalid action payload " + action.type);

  if (formToUpdate === "registerVals") {
    return {
      ...userState,
      registerVals: {
        ...userState.registerVals,
        [name]: value,
      },
    };
  } else {
    return {
      ...userState,
      loginVals: {
        ...userState.loginVals,
        [name]: value,
      },
    };
  }
};

export const cleanValsHandler = (userState) => {
  return {
    ...userState,
    registerVals: userInitState.registerVals,
    loginVals: userInitState.loginVals,
  };
};

export const setFormLoadingHandler = (userState, action) => {
  const { field, status } = action.payload;

  if (!field || typeof status !== "boolean")
    throw new Error("Invalid action payload " + action.type);

  return {
    ...userState,
    [field]: status,
  };
};
