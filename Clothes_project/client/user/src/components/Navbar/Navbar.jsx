import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "./../../frontend_assets/assets";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { navLinksArr } from "./navLinksArr";
import { useGlobal } from "../../hooks/useGlobal";

const Navbar = () => {
  const { setVisibleSearch, totQty, navigate, token, handleLogout } =
    useGlobal();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const location = useLocation();

  const navLinks = navLinksArr.map((el) => (
    <NavLink
      key={el.name}
      to={el.path}
      className="flex flex-col items-center gap-1"
    >
      <p>{el.name}</p>

      <hr
        className="w-2/4 border-none h-[1.5px]
    bg-gray-700 hidden"
      />
    </NavLink>
  ));

  const profileOptArr = [
    { name: "Account", action: () => console.log("to implement") },
    { name: "Orders", action: () => navigate("/orders") },
    {
      name: "Logout",
      action: () => {
        if (token) {
          handleLogout();
        }
      },
    },
  ];

  const profileOpt = profileOptArr.map((el) => (
    <p
      key={el.name}
      onClick={el.action}
      className="cursor-pointer hover:text-black"
    >
      {el.name}
    </p>
  ));

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">{navLinks}</ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            if (location.pathname.includes("/collection"))
              setVisibleSearch(true);
          }}
          src={assets.search_icon}
          alt="search_icon"
          className="w-5 cursor-pointer"
        />

        <div className="group relative">
          <img
            onClick={() => {
              if (!token) navigate("/login");
            }}
            src={assets.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
          />

          {token && (
            <div className="dropdown-menu hidden group-hover:block absolute top-2 right-0 pt-4">
              <div className="flex flex-col gap-2 w-32 py-3 px-5 bg-slate-100 text-gray-500 rounded-xl">
                {profileOpt}
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-5 min-w-5" />

          <p className="absolute right-[-5px] bottom-[-5px] text-center bg-black text-white aspect-square rounded-full text-[10px] w-4 leading-4">
            {totQty}
          </p>
        </Link>

        <img
          onClick={() => setIsSidebarVisible(true)}
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      <Sidebar {...{ isSidebarVisible, setIsSidebarVisible }} />
    </div>
  );
};
export default Navbar;
