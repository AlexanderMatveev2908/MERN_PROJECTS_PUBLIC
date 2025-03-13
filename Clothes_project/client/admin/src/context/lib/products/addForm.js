import {
  CLEAN_ADD_FORM,
  SET_VAL_ADD_FORM,
  TOGGLE_SIZE,
} from "../../actionTypes/productsActionTypes";
import { addProductAPI } from "../../api/productCalls";
import {
  REG_DESCRIPTION,
  REG_PRICE,
  REG_TITLE,
} from "../../../constants/regex";
import { handleLogout } from "../user/login";
import { getProductsHandler } from "./getProducts";
import { showToast } from "../../../utils/toastFn";

export const handleChangeAddForm = (dispatch, e) => {
  const { name: field, value, files, checked, type } = e.target;

  let val = type === "checkbox" ? checked : type === "file" ? files[0] : value;

  if (field === "price" && val < 0) val = "";

  dispatch({ type: SET_VAL_ADD_FORM, payload: { field, val } });
};

export const toggleSize = (dispatch, e) => {
  const { size } = e.target.dataset;

  dispatch({ type: TOGGLE_SIZE, payload: { size } });
};

const checkValuesHandler = ({
  name,
  description,
  price,
  category,
  subCategory,
  sizes,
  ...rest
}) =>
  [category, subCategory].every((el) => !!el.trim()) &&
  sizes?.length &&
  REG_TITLE.test(name) &&
  REG_DESCRIPTION.test(description) &&
  REG_PRICE.test(price) &&
  Object.keys(rest).some((key) => key.startsWith("image") && !!rest[key]);

const prepareData = (productForm) => {
  const formData = new FormData();

  Object.entries(productForm).forEach(([key, value]) => {
    formData.append(
      key,
      value === "price"
        ? +value
        : Array.isArray(value)
        ? JSON.stringify(value)
        : value
    );
  });

  return formData;
};

export const submitAddFormHandler = async (productForm, dispatch, cb, e) => {
  e.preventDefault();

  if (!checkValuesHandler(productForm)) {
    showToast("fill fields properly", "error");
    return;
  }

  try {
    const formData = prepareData(productForm);

    const { msg } = await addProductAPI(dispatch)(formData);

    dispatch({ type: CLEAN_ADD_FORM });
    showToast(msg, "success");
    getProductsHandler(dispatch);

    cb();
  } catch (err) {
    if (err?.response?.status === 401) {
      handleLogout(dispatch, err);
      dispatch({ type: CLEAN_ADD_FORM });
    } else {
      showToast(err.response?.data?.msg || err.message, "error");
    }
  }
};
