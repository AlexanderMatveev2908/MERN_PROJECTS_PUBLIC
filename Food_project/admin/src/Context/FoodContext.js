import { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { foodReducer } from "./foodReducer";
import { formReducer } from "./formReducer";
import { formInitState, initState } from "./initStates";
import { getFoodsV0, removeFoodV0 } from "../lib/foodsLib";
import { handleChangeV0, handleSubmitV0 } from "./../lib/formLib";

export const FoodContext = createContext();

export const useFoodContextVal = () => {
  const [formState, formDispatch] = useReducer(formReducer, formInitState);
  const { fields, formLoading } = formState;

  const [foodState, foodDispatch] = useReducer(foodReducer, initState);
  const { list, isListLoading, isDelLoading } = foodState;

  const navigate = useNavigate();

  const handleChange = (e) => handleChangeV0(e, formDispatch);

  const handleSubmit = (e) =>
    handleSubmitV0(e, fields, formDispatch, getFoods, navigate);

  const getFoods = useCallback(() => getFoodsV0(foodDispatch), []);

  const removeFood = (foodId) => removeFoodV0(foodId, foodDispatch, getFoods);

  return {
    list,
    getFoods,
    isListLoading,

    fields,
    handleChange,
    formLoading,
    handleSubmit,

    isDelLoading,
    removeFood,
  };
};
