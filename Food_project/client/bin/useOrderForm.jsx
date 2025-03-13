import { useReducer } from "react";
import { useStore } from "../src/Context/useStoreContext";

const initState = {
  fields: {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  },
  orderLoading: false,
};

const actionTypes = {
  SET_VAL: "SET_VAL",
  CLEAR_FORM: "CLEAR_FORM",
  SET_ORDER_LOADING: "SET_ORDER_LOADING",
};

const orderFormReducer = (orderFormState, action) => {
  switch (action.type) {
    case actionTypes.SET_VAL: {
      const { name, value } = action.payload;

      return {
        ...orderFormState,
        fields: {
          ...orderFormState.fields,
          [name]: value,
        },
      };
    }

    case actionTypes.SET_ORDER_LOADING: {
      const status = action.payload;

      return {
        ...orderFormState,
        orderLoading: status,
      };
    }

    case actionTypes.CLEAR_FORM: {
      return initState;
    }

    default:
      throw new Error("=> Unknown action type: " + action.type);
  }
};

const setValAct = (name, value) => ({
  type: actionTypes.SET_VAL,
  payload: { name, value },
});

const clearFormAct = () => ({
  type: actionTypes.CLEAR_FORM,
});

const setOrderLoadingAct = (status) => ({
  type: actionTypes.SET_ORDER_LOADING,
  payload: status,
});

export const useOrderForm = () => {
  const [orderFormState, orderFormDispatch] = useReducer(
    orderFormReducer,
    initState
  );
  const { fields, orderLoading } = orderFormState;

  const { food_list, reset, cartItems, getTotPrice, ordersInstance } =
    useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    orderFormDispatch(setValAct(name, value));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    const orderData = {
      address: orderFormState,
      items: orderItems,
      amount: getTotPrice(10),
    };

    try {
      orderFormDispatch(setOrderLoadingAct(true));
      const res = await ordersInstance.post("/", orderData);
      if (res.data?.ok) {
        const { session_url } = res.data;
        window.location.replace(session_url);
        orderFormDispatch(clearFormAct());
      }
    } catch (err) {
      if (err?.response?.status === 401) reset(err);
      console.log(err);
      alert("Error placing order");
    } finally {
      orderFormDispatch(setOrderLoadingAct(false));
    }
  };

  return {
    fields,
    handleChange,
    handlePlaceOrder,
    orderLoading,
  };
};
