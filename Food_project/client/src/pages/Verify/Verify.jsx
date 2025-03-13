import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import { useCallback, useEffect } from "react";
import { useGlobal } from "../../hooks/useGlobal";

const Verify = () => {
  const { ordersInstance } = useGlobal();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  const verifyPayment = useCallback(async () => {
    try {
      const res = await ordersInstance.post("/verify", {
        success,
        orderId,
      });

      if (res.data?.ok) navigate("/orders");
      else navigate("/");
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }, [navigate, orderId, success, ordersInstance]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};
export default Verify;
