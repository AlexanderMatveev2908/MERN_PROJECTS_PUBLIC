import { toast } from "react-toastify";

const toastId = "global-toast";

export const showToast = (message, type) => {
  if (!toast.isActive(toastId)) {
    toast(message, {
      toastId,
      type,
      autoClose: 3000,
    });
  } else {
    toast.update(toastId, {
      render: message,
      type,
      autoClose: 3000,
    });
  }
};
