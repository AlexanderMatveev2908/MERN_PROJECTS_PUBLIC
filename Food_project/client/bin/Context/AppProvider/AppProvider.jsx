import OrdersContextProvider from "../OrdersContext/OrdersContextProvider";
import CartContextProvider from "../CartContext/CartContextProvider";
import FoodContextProvider from "../FoodContext/FoodContextVals";
const Providers = [
  // DO NOT CHANGE ORDER
  OrdersContextProvider, //ORDERS USE CART
  CartContextProvider, // CART USE FOOD
  FoodContextProvider,
];

const AppProvider = ({ children }) =>
  Providers.reduce((Acc, Curr) => <Curr>{Acc}</Curr>, children);

export default AppProvider;
