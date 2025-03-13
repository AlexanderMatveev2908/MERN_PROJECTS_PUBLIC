import { useContext } from "react";
import { FoodContext } from "../Context/FoodContext";

export const useFoodContext = () => {
  const context = useContext(FoodContext);

  if (!context)
    throw new Error("useFoodContext must be used within a FoodContextProvider");

  return { ...context };
};
