const actionTypes = {
  SET_FOOD_LIST: "SET_FOOD_LIST",
  SET_FOOD_LOADING: "SET_FOOD_LOADING",
};

export const foodReducer = (foodState, action) => {
  switch (action.type) {
    case actionTypes.SET_FOOD_LOADING: {
      const status = action.payload;
      return {
        ...foodState,
        foodLoading: status,
      };
    }

    case actionTypes.SET_FOOD_LIST: {
      const foodList = action.payload;

      return {
        ...foodState,
        food_list: foodList,
      };
    }

    default:
      throw new Error("unknown action type");
  }
};
