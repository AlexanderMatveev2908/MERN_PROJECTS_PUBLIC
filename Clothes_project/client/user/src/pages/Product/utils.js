export const destructureItem = (productItem) => {
  const {
    _id = "",
    name = "",
    description = "",
    category = "",
    subCategory = "",
  } = productItem ?? {};
  const { price = 0 } = productItem ?? {};
  const { image = [], sizes = [] } = productItem ?? {};

  return {
    _id,
    name,
    description,
    price,
    image,
    sizes,
    category,
    subCategory,
  };
};
