import { NavLink } from "react-router-dom";
import { navLinksArr } from "./navLinksArr";

const Sidebar = () => {
  const navLinks = navLinksArr.map((el) => (
    <NavLink
      key={el.id}
      to={el.path}
      className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
    >
      <img src={el.image} alt={el.image} className="w-5 h-5 " />

      <p className="hidden md:block">{el.label}</p>
    </NavLink>
  ));

  return (
    <div className="w-[18%] min-h-screen border-r border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[16px]">
        {navLinks}
      </div>
    </div>
  );
};
export default Sidebar;
