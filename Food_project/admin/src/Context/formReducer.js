const actionTypes = {
  SET_VAL: "SET_VAL",
  CLEAR_FORM: "CLEAR_FORM",
  SET_FORM_LOADING: "SET_FORM_LOADING",
};

export const formReducer = (formState, action) => {
  switch (action.type) {
    case actionTypes.SET_VAL: {
      const { val, name } = action.payload;

      if ([val, name].some((el) => el === undefined))
        throw new Error("=> Invalid input: " + val + " for field: " + name);

      return {
        ...formState,
        fields: {
          ...formState.fields,
          [name]: val,
        },
      };
    }

    case actionTypes.SET_FORM_LOADING: {
      const status = action.payload;

      return {
        ...formState,
        formLoading: status,
      };
    }

    case actionTypes.CLEAR_FORM: {
      return {
        ...formState,
        fields: {
          name: "",
          description: "",
          category: "",
          price: "",
          img: "",
        },
      };
    }
    default:
      throw new Error("=> Unknown action type: " + action.type);
  }
};

export const setValAction = (val, name) => ({
  type: "SET_VAL",
  payload: { val, name },
});

export const clearFormAct = () => ({
  type: "CLEAR_FORM",
});

export const setFormLoadingAct = (status) => ({
  type: "SET_FORM_LOADING",
  payload: status,
});
