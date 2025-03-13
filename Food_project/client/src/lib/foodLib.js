import {
  setFoodLoadingAct,
  setFoodListAct,
} from "../Context/CartContext/cartReducer/cartActionCreators.js";

export const getFoodListV0 = async (cartDispatch, foodInstance) => {
  try {
    cartDispatch(setFoodLoadingAct(true));
    const res = await foodInstance.get();

    if (res.data?.ok) {
      cartDispatch(setFoodListAct(res.data.foods));
      return res.data.foods;
    }
  } catch (err) {
    console.log(err);
  } finally {
    cartDispatch(setFoodLoadingAct(false));
  }
};
