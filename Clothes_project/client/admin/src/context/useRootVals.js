import { useMemo, useReducer } from "react";
import { rootReducer } from "./rootReducer";
import { rootInitState } from "./rootInitState";
import { useUserVals } from "./useValsHoks/useUserVals";
import { useProductsVals } from "./useValsHoks/useProductsVals";
import { useOrdersVals } from "./useValsHoks/useOrdersVals";

export const useRootVals = () => {
  const [state, dispatch] = useReducer(rootReducer, rootInitState);

  const userVals = useUserVals(state, dispatch);
  const productsVals = useProductsVals(state, dispatch);
  const ordersVals = useOrdersVals(state, dispatch);

  const vals = useMemo(
    () => ({
      ...userVals,
      ...productsVals,
      ...ordersVals,
    }),
    [userVals, productsVals, ordersVals]
  );

  return {
    ...vals,
  };
};
