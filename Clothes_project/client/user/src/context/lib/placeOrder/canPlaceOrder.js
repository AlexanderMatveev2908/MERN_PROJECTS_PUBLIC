import { toast } from "react-toastify";
import { showToast } from "../../../utils/toast";
import {
  REG_CITY_STATE_COUNTRY,
  REG_EMAIL,
  REG_NAME,
  REG_PHONE,
  REG_STREET,
  REG_ZIP,
} from "../../../constants/regex";

export const canPlaceOrder = ({
  address: {
    firstName,
    lastName,
    email,
    street,
    city,
    state,
    zipcode,
    country,
    phone,
  },
  paymentMethod,
  items,
  amount,
}) => {
  const errmsgs = [];

  if (!REG_NAME.test(firstName))
    errmsgs.push(
      "First name should contain only letters and be 2-50 characters long."
    );

  if (!REG_NAME.test(lastName))
    errmsgs.push(
      "Last name should contain only letters and be 2-50 characters long."
    );

  if (!REG_EMAIL.test(email))
    errmsgs.push("Please enter a valid email address.");

  if (!REG_STREET.test(street))
    errmsgs.push(
      "Street should be 3-100 characters and can contain letters, numbers, and symbols like .,',-."
    );

  if (!REG_CITY_STATE_COUNTRY.test(city))
    errmsgs.push(
      "City should only contain letters and spaces, and be 3-50 characters long."
    );

  if (!REG_CITY_STATE_COUNTRY.test(state))
    errmsgs.push(
      "State should only contain letters and spaces, and be 3-50 characters long."
    );

  if (!REG_CITY_STATE_COUNTRY.test(country))
    errmsgs.push(
      "Country should only contain letters and spaces, and be 3-50 characters long."
    );

  if (!REG_ZIP.test(zipcode))
    errmsgs.push(
      "Zip code should be in a valid format (e.g., 12345 or 12345-6789)."
    );

  if (!REG_PHONE.test(phone)) {
    errmsgs.push("Please enter a valid phone number with the correct format.");
  }

  if (!paymentMethod) errmsgs.push("Please select a payment method.");

  if (errmsgs.length > 0) {
    showToast(errmsgs[0], "error");
    return false;
  }

  if (!items?.length) {
    toast.error("=> BUG ITEMS");
    return;
  }

  if (!amount) {
    toast.error("=> BUG AMOUNT");
    return;
  }

  return true;
};
