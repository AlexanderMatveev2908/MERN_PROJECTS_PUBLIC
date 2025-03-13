export const destructureItemCart = (productItem) => {
  const {
    _id = "",
    name = "",
    description = "",
    category = "",
    subCategory = "",
    size = "",
    qty = 0,
  } = productItem ?? {};
  const { price = 0 } = productItem ?? {};
  const { image = [] } = productItem ?? {};

  return {
    _id,
    name,
    description,
    price,
    image,
    size,
    qty,
    category,
    subCategory,
  };
};
