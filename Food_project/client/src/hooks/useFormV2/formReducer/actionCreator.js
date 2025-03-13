export const setValAct = (val, name, formType) => ({
  type: "SET_VAL",
  payload: { val, name, formType },
});

export const setLoadingAct = (status, formTypeLoading) => ({
  type: "SET_LOADING",
  payload: { status, formTypeLoading },
});

export const clearFormAct = (formType) => ({
  type: "CLEAR_FORM",
  payload: formType,
});
