import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { use_refresh_mutation } from "./auth_api_slice";
import { useSelector } from "react-redux";
import { select_current_token } from "./auth_slice";
import { PulseLoader } from "react-spinners";

const Persist_login = () => {
  const token = useSelector(select_current_token);

  const [refresh, { isLoading, isError, error }] = use_refresh_mutation();

  useEffect(() => {
    const verify_refresh_token = async () => {
      try {
        await refresh().unwrap();
      } catch (err) {
        console.log("err from slice=>", err);
      }
    };

    if (!token) {
      verify_refresh_token();
    }
  }, [token, refresh]);

  if (isLoading) return <PulseLoader color="#36d399" size={15} />;
  else if (isError)
    return (
      <>
        <div className="err_msg">Error: {error?.data?.message}</div>
        <Link to={"/login"}>login again</Link>
      </>
    );
  return <Outlet />;
};

export default Persist_login;
