import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobal } from "../../hooks/useGlobal";

const Verify = () => {
  const { verifyStripeMemoized } = useGlobal();

  useEffect(() => {
    verifyStripeMemoized();
  }, [verifyStripeMemoized]);

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <Spinner propStyle={{ width: "250px", height: "250px" }} />
    </div>
  );
};
export default Verify;
