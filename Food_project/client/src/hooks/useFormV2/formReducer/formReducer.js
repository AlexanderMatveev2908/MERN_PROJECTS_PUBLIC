import { initState } from "./formInitState";

const actionTypes = {
  SET_VAL: "SET_VAL",
  CLEAR_FORM: "CLEAR_FORM",
  SET_LOADING: "SET_LOADING",
};

export const formReducer = (formState, action) => {
  switch (action.type) {
    case actionTypes.SET_VAL: {
      const { val, name, formType } = action.payload;

      if (![val, name, formType].every((el) => el !== undefined))
        throw new Error("missing fields SET_VAL");

      return {
        ...formState,
        [formType]: {
          ...formState[formType],
          [name]: val,
        },
      };
    }

    case actionTypes.SET_LOADING: {
      const { status, formTypeLoading } = action.payload;

      if (![status, formTypeLoading].every((el) => el !== undefined))
        throw new Error("missing fields SET_LOADING");

      return {
        ...formState,
        [formTypeLoading]: status,
      };
    }

    case actionTypes.CLEAR_FORM: {
      const formType = action.payload;

      if (!formType) throw new Error("missing field CLEAR_FORM");

      if (formType === "userForms")
        return {
          ...formState,
          registerVals: {
            ...initState.registerVals,
          },
          loginVals: {
            ...initState.loginVals,
          },
        };

      return {
        ...formState,
        [formType]: {
          ...initState[formType],
        },
      };
    }

    default: {
      throw new Error("Invalid action type " + action.type);
    }
  }
};
