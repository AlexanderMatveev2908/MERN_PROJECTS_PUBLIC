import { Outlet } from "react-router-dom";
import Dash_header from "./Dash_header";
import Dash_footer from "./Dash_footer";
const Dash_layout = () => {
  return (
    <>
      <Dash_header />

      <div className="dash_container">
        <Outlet />
      </div>

      <Dash_footer />
    </>
  );
};

export default Dash_layout;
