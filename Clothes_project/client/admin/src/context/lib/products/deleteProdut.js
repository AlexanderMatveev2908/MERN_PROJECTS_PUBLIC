import { toast } from "react-toastify";
import { deleteProductAPI } from "../../api/productCalls";
import { handleLogout } from "../user/login";
import { showToast } from "../../../utils/toastFn";
import { PRODUCT_DELETED } from "../../actionTypes/productsActionTypes";

export const deleteProductHandler = async (dispatch, id) => {
  try {
    const { msg } = await deleteProductAPI(dispatch, id);

    showToast(msg, "success");
    dispatch({ type: PRODUCT_DELETED, payload: { id } });
  } catch (err) {
    if (err?.response?.status === 401) {
      handleLogout(dispatch, err);
    } else {
      toast.error(err.response?.data?.msg || err.message);
    }
  }
};
// export const deleteProductHandler = async (dispatch, id) => {
//   try {
//     const { msg } = await deleteProductAPI(dispatch, id);

//     // toast.success(msg);
//     showToast(msg, "success");
//     getProductsHandler(dispatch);
//   } catch (err) {
//     if (err?.response?.status === 401) {
//       handleLogout(dispatch, err);
//     } else {
//       toast.error(err.response?.data?.msg || err.message);
//     }
//   }
// };
