import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { select_user_by_id } from "./users_api_slice";
import { PropTypes } from "prop-types";
import { use_get_users_query } from "./users_api_slice";
import { memo } from "react";

const User = ({ user_id }) => {
  // const user = useSelector((state) => select_user_by_id(state, user_id));

  const { user } = use_get_users_query("users_list", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[user_id],
    }),
  });

  const navigate = useNavigate();

  if (!user) return null;

  const handle_edit = () => navigate(`/dash/users/${user_id}`);

  const user_roles_string = user.roles.toString().replaceAll(",", ", ");

  const cell_status = user.active ? "" : "table_cell_inactive";

  return (
    <tr className="table_row_user">
      <td className={`table_cell ${cell_status}`}>{user.username}</td>

      <td className={`table_cell ${cell_status}`}>{user_roles_string}</td>

      <td className={`table_cell ${cell_status}`}>
        <button onClick={handle_edit} className="icon_button table_button">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

const memoize_user = memo(User);

User.propTypes = {
  user_id: PropTypes.string.isRequired,
};

export default memoize_user;
