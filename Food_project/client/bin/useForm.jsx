import { useMemo, useReducer } from "react";
import { urlUser } from "../src/constants/urls.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useStore } from "../src/Context/useStoreContext.js";

const initState = {
  registerVals: {
    name: "",
    email: "",
    password: "",
    terms: false,
  },
  loginVals: {
    email: "",
    password: "",
  },
  isLoading: false,
};

const actionTypes = {
  SET_VAL: "SET_VAL",
  CLEAR_FORM: "CLEAR_FORM",
  SET_LOADING: "SET_LOADING",
};

const formReducer = (formState, action) => {
  switch (action.type) {
    case actionTypes.SET_VAL: {
      const { val, name, formType } = action.payload;

      if (formType === "Sign Up")
        return {
          ...formState,
          registerVals: {
            ...formState.registerVals,
            [name]: val,
          },
        };
      else if (formType === "Login")
        return {
          ...formState,
          loginVals: {
            ...formState.loginVals,
            [name]: val,
          },
        };
      else return formState;
    }

    case actionTypes.SET_LOADING: {
      const status = action.payload;

      return {
        ...formState,
        isLoading: status,
      };
    }

    case actionTypes.CLEAR_FORM: {
      return initState;
    }

    default:
      throw new Error("=> Unknown action type: " + action.type);
  }
};

const setValAct = (val, name, formType) => ({
  type: "SET_VAL",
  payload: { val, name, formType },
});

const clearFormAct = () => ({
  type: "CLEAR_FORM",
});

const setLoadingAct = (status) => ({
  type: "SET_LOADING",
  payload: status,
});

export const useForm = () => {
  const [formState, formDispatch] = useReducer(formReducer, initState);
  const { registerVals, loginVals, isLoading } = formState;

  const { setToken, setShowLogin } = useStore();

  const userInstance = useMemo(
    () =>
      axios.create({
        baseURL: urlUser,
      }),
    []
  );

  const handleChange = (e, formType) => {
    const { name, value, type, checked } = e.target;

    const val = type === "checkbox" ? checked : value;

    formDispatch(setValAct(val, name, formType));
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();

    try {
      formDispatch(setLoadingAct(true));

      // eslint-disable-next-line
      const { terms, ...rest } = registerVals;

      const formVals = formType === "Sign Up" ? { ...rest } : loginVals;

      const endpoint = formType === "Sign Up" ? "/register" : "/login";

      const res = await userInstance.post(endpoint, formVals);

      if (res.data?.ok) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        formDispatch(clearFormAct());
        setShowLogin(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    } finally {
      formDispatch(setLoadingAct(false));
    }
  };

  return {
    handleChange,
    formState,
    isLoading,
    handleSubmit,
  };
};
