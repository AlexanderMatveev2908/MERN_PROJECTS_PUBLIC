import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";

export const useGlobal = () => {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error("useGlobal must be used within a GlobalContextProvider");

  return { ...context };
};
