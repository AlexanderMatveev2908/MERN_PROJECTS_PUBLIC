export const cleanSearchHandler = (productsState) => {
  return {
    ...productsState,
    search: "",
  };
};

export const setVisibleSearchHandler = (productsState, action) => {
  const status = action.payload;

  if (typeof status !== "boolean")
    throw new Error("invalid filed " + action.type);

  return {
    ...productsState,
    visibleSearchBar: status,
  };
};
