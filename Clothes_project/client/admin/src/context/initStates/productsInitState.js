export const productsInitState = {
  products: [],
  productsLoading: false,
  productsError: null,

  productForm: {
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    bestseller: false,
  },
  productFormLoading: false,
  productFormError: null,

  deletingProductsLoading: false,
  deletingProductsError: null,
};
