import { useContext } from "react";
import { GlobalContext } from "../context/global/GlobalContext";

export const useGlobal = () => {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error("useGlobal must be used within a GlobalContextProvider");

  return context;
};
