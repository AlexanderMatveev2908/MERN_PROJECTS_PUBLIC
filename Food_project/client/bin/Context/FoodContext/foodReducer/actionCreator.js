export const setFoodListAct = (foodList) => ({
  type: "SET_FOOD_LIST",
  payload: foodList,
});

export const setFoodLoadingAct = (status) => ({
  type: "SET_FOOD_LOADING",
  payload: status,
});
