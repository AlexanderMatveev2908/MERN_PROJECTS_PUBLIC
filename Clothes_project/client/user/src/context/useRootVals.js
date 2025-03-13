import { useMemo, useReducer } from "react";
import { rooInitState } from "./rooInitState";
import { rootReducer } from "./rootReducer";
import { useProductsVals } from "./useValsHooks/useProductsVals";
import { useCartVals } from "./useValsHooks/useCartVals";
import { usePlaceOrderVals } from "./useValsHooks/usePlaceOrderVals";
import { useOrdersVals } from "./useValsHooks/useOrdersVals";
import { useUserVals } from "./useValsHooks/useUserVals";

export const useRootVals = () => {
  const [state, dispatch] = useReducer(rootReducer, rooInitState);

  const productsVals = useProductsVals({ state, dispatch });
  const cartVals = useCartVals({ state, dispatch });
  const placeOrderVals = usePlaceOrderVals({ state, dispatch });
  const ordersVals = useOrdersVals({ state, dispatch });
  const userVals = useUserVals({ state, dispatch });

  const memoizedVals = useMemo(() => {
    return {
      ...productsVals,
      ...cartVals,
      ...placeOrderVals,
      ...ordersVals,
      ...userVals,
    };
  }, [productsVals, cartVals, placeOrderVals, ordersVals, userVals]);

  return {
    ...memoizedVals,
  };
};
