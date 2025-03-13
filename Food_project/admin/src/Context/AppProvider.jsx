import FoodContextProvider from "./FoodContextProvider";
import OrdersContextProvider from "./OrdersContextProvider";

const Providers = [FoodContextProvider, OrdersContextProvider];

const AppProvider = ({ children }) => {
  return Providers.reduce((Acc, Curr) => <Curr>{Acc}</Curr>, children);
};

export default AppProvider;
