import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const prev_title = document.title;

    document.title = title;

    return () => (document.title = prev_title);
  }, [title]);
};

export default useTitle;
