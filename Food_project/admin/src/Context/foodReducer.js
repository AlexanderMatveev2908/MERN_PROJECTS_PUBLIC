const actionTypes = {
  SET_LIST: "SET_LIST",
  SET_LIST_LOADING: "SET_LIST_LOADING",
  SET_DEL_LOADING: "SET_DEL_LOADING",
};

export const foodReducer = (foodState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST: {
      const list = action.payload;

      if (list === undefined) throw new Error("=> Invalid input: ");

      return {
        ...foodState,
        list,
      };
    }

    case actionTypes.SET_LIST_LOADING: {
      const status = action.payload;

      if (status === undefined) throw new Error("=> Invalid input: ");

      return {
        ...foodState,
        isListLoading: status,
      };
    }

    case actionTypes.SET_DEL_LOADING: {
      const statusOrFoodId = action.payload;

      if (statusOrFoodId === undefined) throw new Error("=> Invalid input: ");

      return {
        ...foodState,
        isDelLoading: statusOrFoodId,
      };
    }

    default: {
      throw new Error("unknown action " + action.type);
    }
  }
};

export const setListAct = (list) => ({
  type: actionTypes.SET_LIST,
  payload: list,
});

export const setListLoadingAct = (status) => ({
  type: actionTypes.SET_LIST_LOADING,
  payload: status,
});

export const setDelLoadingAct = (statusOrFoodId) => ({
  type: actionTypes.SET_DEL_LOADING,
  payload: statusOrFoodId,
});
