import { useEffect, useState } from "react";
import { useGlobal } from "./useGlobal";

export const useCartItemHandlers = (_id, size, qty, qtyRef) => {
  const { removeFromCart, updateQty, removeLoading } = useGlobal();
  const [localQty, setLocalQty] = useState(qty);

  useEffect(() => {
    setLocalQty(qty);
  }, [qty]);

  const calQtyFromE = (e) => {
    const { value } = e.target;
    if (+value <= 0 || value.includes(".") || +value === qty) return;
    else return +value;
  };

  const handleChangeQty = (e) => {
    if (!isNaN(+e.target.value)) setLocalQty(e.target.value);
  };

  const handleBlur = (e) => {
    const localQtyUpdated = calQtyFromE(e);
    if (!localQtyUpdated) {
      setLocalQty(qty);
      return;
    }
    updateQty(_id, size, localQtyUpdated);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const localQtyUpdated = calQtyFromE(e);
      if (!localQtyUpdated) {
        setLocalQty(qty);
        return;
      }
      updateQty(_id, size, localQtyUpdated);
      qtyRef?.current.blur();
    }
  };

  return {
    localQty,
    handleChangeQty,
    handleBlur,
    handleKeyDown,
    removeFromCart,
    removeLoading,
  };
};
