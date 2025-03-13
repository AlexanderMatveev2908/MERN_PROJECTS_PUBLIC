import { showToast } from "../../../utils/toast";
import { SET_CART_ITEMS } from "../../actionTypes/cartActionTypes";
import { SET_VERIFYING } from "../../actionTypes/placeOrderActionTypes";
import { verifyStripeAPI } from "../../api/placeOrder/verifyAPI";

export const verifyStripeLib = async (
  searchParams,
  navigate,
  dispatch,
  token,
  logoutCb
) => {
  if (!token) return;
  try {
    dispatch({
      type: SET_VERIFYING,
      payload: { field: "verifyingStripe", status: true },
    });
    const data = await verifyStripeAPI(searchParams);

    if (data?.deleted) {
      showToast("order deleted successfully", "success");
      navigate("/");
      return;
    }

    if (data?.success) {
      showToast(data.msg, "success");
      dispatch({ type: SET_CART_ITEMS, payload: { cartItems: {} } });
      navigate("/orders");
    } else {
      showToast(data.msg, "error");
      navigate("/cart");
    }
  } catch (err) {
    console.dir(err);
    if (err?.status === 401) logoutCb();
    else navigate("/");

    showToast(err?.response?.data?.msg || err.message, "error");
  } finally {
    dispatch({
      type: SET_VERIFYING,
      payload: { field: "verifyingStripe", status: false },
    });
  }
};
