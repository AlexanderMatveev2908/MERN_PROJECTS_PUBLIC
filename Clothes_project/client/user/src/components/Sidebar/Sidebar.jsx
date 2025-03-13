import { NavLink } from "react-router-dom";
import { assets } from "../../frontend_assets/assets";
import PropTypes from "prop-types";
import { navLinksArr } from "../Navbar/navLinksArr";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const sidebarLinks = navLinksArr.map((el) => (
    <NavLink
      onClick={() => setIsSidebarVisible(false)}
      key={el.name}
      to={el.path}
      className="py-2 pl-6 border"
    >
      {el.name}
    </NavLink>
  ));

  return (
    <div
      className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
        isSidebarVisible ? "w-full" : "w-0"
      }`}
    >
      <div className="flex flex-col text-gray-600">
        <div
          onClick={() => setIsSidebarVisible(false)}
          className="cursor-pointer flex items-center gap-4 p-3"
        >
          <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />

          <p>Back</p>
        </div>

        {sidebarLinks}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  setIsSidebarVisible: PropTypes.func.isRequired,
};

export default Sidebar;
