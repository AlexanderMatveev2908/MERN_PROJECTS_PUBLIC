export const REG_NAME = /^[A-Za-z ']{2,50}$/i;
export const REG_EMAIL = /^[a-zA-Z0-9._&+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const REG_STREET = /^[A-Za-z0-9\s.,'-]{3,100}$/;
export const REG_CITY_STATE_COUNTRY = /^[A-Za-z\s']{3,50}$/;
export const REG_ZIP = /^\d{5}(-\d{4})?$/;
export const REG_PHONE = /^\+?\d{1,3}([ -]?\(?\d{3}\)?)[ -]?\d{3}[ -]?\d{4}$/;
