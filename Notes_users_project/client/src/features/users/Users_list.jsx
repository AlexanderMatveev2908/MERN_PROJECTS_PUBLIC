import { use_get_users_query } from "./users_api_slice";
import User from "./User";
import { PulseLoader } from "react-spinners";

const Users_list = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = use_get_users_query("users_list", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(users);

  let table_content;

  if (isSuccess) {
    const { ids } = users;

    table_content = ids?.length
      ? ids.map((user_id) => <User key={user_id} user_id={user_id} />)
      : null;
  }

  return (
    <>
      <table className="table table_users">
        <thead className="table_thead">
          <tr>
            <th scope="col" className="table_th user_username">
              Username
            </th>

            <th scope="col" className="table_th user_roles">
              Roles
            </th>

            <th scope="col" className="table_th user_edit">
              Edit
            </th>
          </tr>
        </thead>

        <tbody>{table_content}</tbody>
      </table>

      {isLoading && <PulseLoader color="#36d399" size={15} />}

      {isError && <p className="err_msg">{error?.data?.message}</p>}
    </>
  );
};

export default Users_list;
