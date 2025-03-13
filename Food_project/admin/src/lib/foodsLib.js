import { toast } from "react-toastify";
import {
  setDelLoadingAct,
  setListAct,
  setListLoadingAct,
} from "../Context/foodReducer";
import { foodsInstance } from "../constants/url";

export const getFoodsV0 = async (foodDispatch) => {
  try {
    foodDispatch(setListLoadingAct(true));

    const res = await foodsInstance.get("/");

    if (res.data?.ok) foodDispatch(setListAct(res.data.foods));
  } catch (err) {
    console.log(err);
    foodDispatch(setListAct([]));
    toast.error(`${err.response.status}: ${err?.response.statusText}`);
  } finally {
    foodDispatch(setListLoadingAct(false));
  }
};

export const removeFoodV0 = async (foodId, foodDispatch, getFoods) => {
  try {
    foodDispatch(setDelLoadingAct(foodId));
    const res = await foodsInstance.delete(`/${foodId}`);

    res.data?.ok && (getFoods(), toast.success("Food removed successfully"));
  } catch (err) {
    console.log(err);
    toast.error(`${err.response.status}: ${err?.response.statusText}`);
  } finally {
    foodDispatch(setDelLoadingAct(false));
  }
};
