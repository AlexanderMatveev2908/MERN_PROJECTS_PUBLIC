import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { use_send_logout_mutation } from "../features/auth/auth_api_slice";
import use_auth from "../hooks/use_auth";
import { PulseLoader } from "react-spinners";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const Dash_header = () => {
  const { is_manager, is_admin } = use_auth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    use_send_logout_mutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const on_new_note_clicked = () => navigate("/dash/notes/new");
  const on_new_user_clicked = () => navigate("/dash/users/new");
  const on_users_clicked = () => navigate("/dash/users");
  const on_notes_clicked = () => navigate("/dash/notes");

  let dash_class = null;

  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  )
    dash_class = "dash_header_container_small";

  let new_note_btn = null;

  if (NOTES_REGEX.test(pathname)) {
    new_note_btn = (
      <button
        className="icon_button"
        title="add new techNote"
        onClick={on_new_note_clicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let new_user_btn = null;

  if (USERS_REGEX.test(pathname)) {
    new_user_btn = (
      <button
        className="icon_button"
        title="add new user"
        onClick={on_new_user_clicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let users_btn = null;

  if (is_manager || is_admin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("dash")) {
      users_btn = (
        <button
          className="icon_button"
          title="view users settings"
          onClick={on_users_clicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notes_btn = null;

  if (!NOTES_REGEX.test(pathname) && pathname.includes("dash")) {
    notes_btn = (
      <button
        className="icon_button"
        title="view techNotes"
        onClick={on_notes_clicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logout_btn = (
    <button className="icon_button" title="logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  let nav_content;

  if (isLoading) nav_content = <PulseLoader color="#36d399" size={15} />;
  else
    nav_content = (
      <>
        {new_note_btn}
        {new_user_btn}
        {notes_btn}
        {users_btn}
        {logout_btn}
      </>
    );

  return (
    <header className="dash_header">
      <div className={`dash_header_container ${dash_class}`}>
        <Link to={"/dash"}>
          <h1 className="dash_header_title">techNotes</h1>
        </Link>

        {isError && <p>{error?.data?.message}</p>}

        <nav className="dash_header_nav">{nav_content}</nav>
      </div>
    </header>
  );
};

export default Dash_header;
