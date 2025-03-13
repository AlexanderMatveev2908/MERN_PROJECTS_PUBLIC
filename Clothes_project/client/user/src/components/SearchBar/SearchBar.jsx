import { useLocation } from "react-router-dom";
import { assets } from "../../frontend_assets/assets";
import { useGlobal } from "./../../hooks/useGlobal";
import { useEffect, useState } from "react";
const SearchBar = () => {
  const {
    search,
    handleChangeFilter,
    cleanSearch,
    visibleSearchBar,
    setVisibleSearch,
  } = useGlobal();

  const [visibleComponent, setVisibleComponent] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/collection")) setVisibleComponent(true);
    else setVisibleComponent(false);
  }, [location, setVisibleSearch]);

  return visibleSearchBar && visibleComponent ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none bg-inherit text-sm "
          name="search"
          value={search}
          onChange={handleChangeFilter}
        />

        <img src={assets.search_icon} alt="" className="w-4" />
      </div>

      <img
        onClick={() => {
          setVisibleSearch(false);
          cleanSearch();
        }}
        data-name="search"
        src={assets.cross_icon}
        alt=""
        className="inline w-[0.9rem] cursor-pointer"
      />
    </div>
  ) : null;
};
export default SearchBar;
