import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { foodInitState } from "./foodReducer/foodInitState";
import { foodInstanceV0 } from "../../constants/urls";
import { getFoodListV0 } from "./../../lib/foodLib";
import { foodReducer } from "./foodReducer/foodReducer";

export const FoodContext = createContext();

export const useFoodContextVals = () => {
  const [foodState, foodDispatch] = useReducer(foodReducer, foodInitState);
  const { food_list, foodLoading } = foodState;

  const [showLogin, setShowLogin] = useState(false);

  const foodInstance = useMemo(() => foodInstanceV0, []);

  const getFoodList = useCallback(
    () => getFoodListV0(foodDispatch, foodInstance),
    [foodInstance]
  );

  return {
    food_list,
    foodLoading,
    getFoodList,

    showLogin,
    setShowLogin,
  };
};
