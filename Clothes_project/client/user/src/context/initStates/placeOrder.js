export const placeOrderInitState = {
  placeOrderForm: {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    paymentMethod: "",
  },
  placeOrderLoading: false,
  orderPlaced: false,
  verifyingStripe: false,
};
