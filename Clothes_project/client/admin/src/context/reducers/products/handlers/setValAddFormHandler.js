export const setValAddFormHandler = (productsState, action) => {
  const { field, val } = action.payload;

  if (!field) throw new Error("Invalid field or value " + action.type);

  return {
    ...productsState,
    productForm: {
      ...productsState.productForm,
      [field]: val,
    },
  };
};

export const toggleSizeHandler = (productsState, action) => {
  const { size } = action.payload;

  if (!size) throw new Error("Invalid size " + action.type);

  const updatedSizes = productsState.productForm.sizes.includes(size)
    ? productsState.productForm.sizes.filter((s) => s !== size)
    : [...productsState.productForm.sizes, size];

  return {
    ...productsState,
    productForm: {
      ...productsState.productForm,
      sizes: updatedSizes,
    },
  };
};
