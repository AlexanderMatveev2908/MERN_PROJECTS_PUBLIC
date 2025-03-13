// import { useSelector } from "react-redux";
// import { select_all_users } from "../users/users_api_slice";
import New_note_form from "./New_note_form";
import { use_get_users_query } from "../users/users_api_slice";
import { PulseLoader } from "react-spinners";

const New_note = () => {
  // const users = useSelector((state) => select_all_users(state));
  const { users } = use_get_users_query("users_list", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users.length) return <PulseLoader color="#36d399" size={15} />;

  return <New_note_form users={users} />;
};

export default New_note;
