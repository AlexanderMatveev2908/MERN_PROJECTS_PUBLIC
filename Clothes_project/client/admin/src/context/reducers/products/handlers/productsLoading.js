import { productsInitState } from "../../../initStates/productsInitState";

export const setLoadingHandler = (productsState, action) => {
  const { field, status } = action.payload;

  if (!field || (typeof status !== "boolean" && typeof status !== "string"))
    throw new Error("Invalid payload for " + action.type);

  return {
    ...productsState,
    [field]: status,
  };
};

export const setErrorHandler = (productsState, action) => {
  const { field, status } = action.payload;

  if (!field || (typeof status !== "object" && typeof status !== "string"))
    throw new Error("Invalid payload for " + action.type);

  return {
    ...productsState,
    [field]: status,
  };
};

export const cleanAddFormHandler = (productsState) => {
  return {
    ...productsState,
    productForm: productsInitState.productForm,
  };
};
