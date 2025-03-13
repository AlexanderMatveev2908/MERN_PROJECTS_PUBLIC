export const setProductsHandler = (productsState, action) => {
  const { field, val } = action.payload;

  if (!Array.isArray(val) || !field)
    throw new Error("invalid filed " + action.type);

  return {
    ...productsState,
    [field]: val,
    productsError: null,
  };
};

export const setProductsLoadingHandler = (productsState, action) => {
  const { field, status } = action.payload;

  if (typeof status !== "boolean" || !field)
    throw new Error("invalid filed " + action.type);
  return {
    ...productsState,
    [field]: status,
  };
};

export const setProductsErrorHandler = (productsState, action) => {
  const { field, status } = action.payload;

  if (!field || (typeof status !== "object" && typeof status !== "string"))
    throw new Error("Invalid payload for " + action.type);

  return {
    ...productsState,
    [field]: status,
  };
};
