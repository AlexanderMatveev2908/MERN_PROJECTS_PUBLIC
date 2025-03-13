export const changeFilters = (productsState, action) => {
  const { field, val } = action.payload;

  if (!field || typeof val === "undefined")
    throw new Error("invalid filed " + action.type);

  if (field === "mainCategories" || field === "subCategories") {
    const updatedCat = productsState[field].includes(val)
      ? productsState[field].filter((category) => category !== val)
      : [...productsState[field], val];

    return {
      ...productsState,
      [field]: updatedCat,
    };
  } else {
    return {
      ...productsState,
      [field]: val,
    };
  }
};
