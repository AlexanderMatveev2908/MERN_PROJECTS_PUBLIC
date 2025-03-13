import { useSelector } from "react-redux";
import { select_current_token } from "../features/auth/auth_slice.js";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(select_current_token);

  let is_manager = false;
  let is_admin = false;
  let status = "employee";

  if (!token) return { username: "", roles: [], is_manager, is_admin, status };

  const decoded = jwtDecode(token);

  const { username, roles } = decoded.user_info;

  is_manager = roles.includes("manager");
  is_admin = roles.includes("admin");

  if (is_manager) status = "manager";
  else if (is_admin) status = "admin";

  return { username, roles, is_manager, is_admin, status };
};

export default useAuth;
