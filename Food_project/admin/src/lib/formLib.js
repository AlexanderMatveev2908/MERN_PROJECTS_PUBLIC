import { toast } from "react-toastify";
import {
  clearFormAct,
  setFormLoadingAct,
  setValAction,
} from "../Context/formReducer";
import { foodsInstance } from "../constants/url";

export const handleChangeV0 = (e, formDispatch) => {
  const { name, value, files } = e.target;

  if (name === "price" && isNaN(+value)) return;

  const val = files ? files[0] : value;

  formDispatch(setValAction(val, name));
};

const clearForm = (formDispatch) => {
  formDispatch(clearFormAct());
};

export const handleSubmitV0 = async (
  e,
  fields,
  formDispatch,
  getFoods,
  navigate
) => {
  e.preventDefault();

  const { img } = fields;

  try {
    formDispatch(setFormLoadingAct(true));
    const formData = new FormData();

    for (let key in fields) {
      if (key === "img") continue;
      formData.append(key, fields[key]);
    }
    formData.append("image", img);

    const res = await foodsInstance.post("/", formData);

    if (res.data?.ok) {
      clearForm(formDispatch);
      getFoods();

      navigate("/list");

      setTimeout(
        () =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          }),
        100
      );

      toast.success("Food added successfully");
    }
  } catch (err) {
    console.log(err);
    toast.error(`${err.response.status}: ${err.response.statusText}`);
  } finally {
    formDispatch(setFormLoadingAct(false));
  }
};
