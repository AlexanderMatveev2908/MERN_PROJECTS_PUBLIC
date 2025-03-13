export const setCurrStatFormHandler = (userState, action) => {
  const updatedState = action.payload;

  if (!updatedState) throw new Error("Invalid updatedState");

  return {
    ...userState,
    currStateForm: updatedState,
  };
};
