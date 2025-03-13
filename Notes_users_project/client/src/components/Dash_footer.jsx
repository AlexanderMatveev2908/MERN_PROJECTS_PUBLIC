import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import use_auth from "../hooks/use_auth";

const Dash_footer = () => {
  const { username, status } = use_auth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const on_go_home_clicked = () => navigate("/dash");

  let go_home_button = null;

  if (pathname !== "/dash") {
    go_home_button = (
      <button
        className="dash_footer_button icon_button"
        title="home"
        onClick={on_go_home_clicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  return (
    <footer className="dash_footer">
      {go_home_button}

      <p>Current user: {username}</p>

      <p>Status: {status}</p>
    </footer>
  );
};

export default Dash_footer;
