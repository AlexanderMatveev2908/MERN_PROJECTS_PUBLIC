import { useLocation, Navigate, Outlet } from "react-router-dom";
import use_auth from "../../hooks/use_auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

const Require_auth = ({ allowed_roles }) => {
  const location = useLocation();

  const { roles } = use_auth();

  const [position, set_position] = useState(null);
  const [is_loading, set_is_loading] = useState(false);

  useEffect(() => {
    try {
      set_is_loading(true);

      if (roles.some((role) => allowed_roles.includes(role))) set_position(1);
      else set_position(0);
    } catch (err) {
      console.log(err);
    } finally {
      set_is_loading(false);
    }
  }, [roles, allowed_roles, is_loading]);

  if (position === null && is_loading)
    return <PulseLoader color="#36d399" size={15} />;
  else if (position === 1) return <Outlet />;
  else if (position === 0 && !is_loading)
    return <Navigate to={"/login"} state={{ from: location }} replace />;
};

Require_auth.propTypes = {
  allowed_roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Require_auth;
