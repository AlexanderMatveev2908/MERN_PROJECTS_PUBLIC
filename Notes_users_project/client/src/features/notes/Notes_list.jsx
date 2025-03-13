import { use_get_notes_query } from "./notes_api_slice.js";
import Note from "./Note";
import use_auth from "../../hooks/use_auth.js";
import { PulseLoader } from "react-spinners";

const Notes_list = () => {
  const { username, is_manager, is_admin } = use_auth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = use_get_notes_query("notes_list", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let table_content;

  if (isSuccess) {
    const { ids, entities } = notes;

    let filtered_ids;

    if (is_manager || is_admin) filtered_ids = [...ids];
    else
      filtered_ids = ids.filter(
        (note_id) => entities[note_id].username === username
      );

    table_content =
      ids?.length &&
      filtered_ids.map((note_id) => <Note key={note_id} note_id={note_id} />);
  }
  return (
    <>
      <table className="table table_notes">
        <thead className="table_head">
          <tr>
            <th scope="col" className="table_th note_status">
              status
            </th>

            <th scope="col" className="table_th note_created">
              created
            </th>

            <th scope="col" className="table_th note_updated">
              updated
            </th>

            <th scope="col" className="table_th note_title">
              title
            </th>

            <th scope="col" className="table_th note_username">
              owner
            </th>

            <th scope="col" className="table_th note_edit">
              edit
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

export default Notes_list;
