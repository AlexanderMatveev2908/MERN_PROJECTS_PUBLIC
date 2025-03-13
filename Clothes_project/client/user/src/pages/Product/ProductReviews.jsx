import { useMemo } from "react";
import { loremFormatter } from "../../utils/txtPlaceholderMaker";

const ProductReviews = () => {
  return (
    <div className="mt-20">
      <div className="flex">
        <p className="border px-5 py-3 text-sm">Description</p>

        <p className="border px-5 py-3 text-sm ">
          Reviews&ensp;({useMemo(() => Math.floor(Math.random() * 500), [])})
        </p>
      </div>

      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>{loremFormatter(300, true)}</p>

        <p>{loremFormatter(200, true)}</p>
      </div>
    </div>
  );
};
export default ProductReviews;
