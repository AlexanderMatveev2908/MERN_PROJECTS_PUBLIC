import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { select_note_by_id } from "./notes_api_slice";
// import { select_all_users } from "../users/users_api_slice";
import Edit_note_form from "./Edit_note_form";
import use_auth from "../../hooks/use_auth";
import { use_get_notes_query } from "./notes_api_slice";
import { use_get_users_query } from "../users/users_api_slice";
import { PulseLoader } from "react-spinners";

const Edit_note = () => {
  const { id } = useParams();

  const { username, is_manager, is_admin } = use_auth();

  const { note } = use_get_notes_query("note_list", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = use_get_users_query("users_list", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users.length) return <PulseLoader color="#36d399" size={15} />;
  if (!is_manager && !is_admin)
    if (note.username !== username) return <p className="err_msg">no access</p>;
  // const note = useSelector((state) => select_note_by_id(state, id));
  // const users = useSelector(select_all_users);
  return <Edit_note_form note={note} users={users} />;
};

export default Edit_note;
