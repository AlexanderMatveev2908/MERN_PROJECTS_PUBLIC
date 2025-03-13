export const cartLoadingHandler = (cartState, action) => {
  const { field, status } = action.payload;

  if (!field || (typeof status !== "boolean" && typeof status !== "string"))
    throw new Error("invalid filed " + action.type);

  return {
    ...cartState,
    [field]: status,
  };
};
