import { SET_PRODUCT_ITEM } from "../../actionTypes/productsActTypes";
import { getProductAPI } from "../../api/products/getProducts";

export const setProductItem = async (dispatch, productId) => {
  try {
    const product = await getProductAPI(dispatch)(productId);
    dispatch({ type: SET_PRODUCT_ITEM, payload: { product } });
    // eslint-disable-next-line
  } catch (err) {
    // console.dir(err);
  }
};
