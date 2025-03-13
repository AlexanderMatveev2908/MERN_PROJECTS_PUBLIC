export const deepCompare = (prevArr, nextArr, key) => {
  if (prevArr.length !== nextArr.length) return false;
  return prevArr.every((prevItem, i) => prevItem[key] === nextArr[i][key]);
};
