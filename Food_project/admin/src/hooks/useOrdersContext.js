import { useContext } from "react";
import { OrdersContext } from "../Context/OrdersContext";

export const useOrdersContext = () => {
  const context = useContext(OrdersContext);

  if (!context)
    throw new Error(
      "useOrdersContext must be used within a OrdersContextProvider"
    );

  return { ...context };
};
