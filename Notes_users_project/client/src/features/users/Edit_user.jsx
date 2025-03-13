import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { select_user_by_id } from "./users_api_slice";
import Edit_user_form from "./Edit_user_form";
import { PulseLoader } from "react-spinners";
import { use_get_users_query } from "./users_api_slice";

const Edit_user = () => {
  const { id } = useParams();

  const { user } = use_get_users_query("users_list", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  // const user = useSelector((state) => select_user_by_id(state, id));

  if (!user) return <PulseLoader color="#36d399" size={15} />;

  return <Edit_user_form user={user} />;
};

export default Edit_user;

// import { useParams } from "react-router-dom";
// import { use_get_user_query } from "./users_api_slice";
// import Edit_user_form from "./Edit_user_form";

// const Edit_user = () => {
//   const { id } = useParams();

//   const { data, isLoading, isSuccess, isError, error } = use_get_user_query(id);

//   return (
//     <>
//       {isSuccess && <Edit_user_form user={data?.user} />}
//       {isLoading && <p>loading...</p>}
//       {isError && <p className="err_msg">{error?.data?.message}</p>}
//     </>
//   );
// };

// export default Edit_user;
