export const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
export const REG_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.]{8,16}$/;
export const REG_PRICE = /^[0-9]+(\.[0-9]{1,2})?$/;
export const REG_TITLE = /^[a-zA-Z0-9 ',.!?-]+$/;
export const REG_DESCRIPTION = /^[a-zA-Z0-9\s.,'"\-!?]{1,500}$/;
