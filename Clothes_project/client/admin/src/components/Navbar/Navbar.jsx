import { Link } from "react-router-dom";
import { assets } from "./../../admin_assets/assets";
import { useGlobal } from "../../hooks/useGlobal";
const Navbar = () => {
  const { handleLogout } = useGlobal();

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <Link to="/list">
        <img
          src={assets.logo}
          alt={assets.logo}
          className="w-[max(10%,80px)]"
        />
      </Link>

      <button
        onClick={handleLogout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};
export default Navbar;
