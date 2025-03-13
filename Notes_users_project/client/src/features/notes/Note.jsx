import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { select_note_by_id } from "./notes_api_slice";
import { PropTypes } from "prop-types";
import { use_get_notes_query } from "./notes_api_slice";
import { memo } from "react";

const Note = ({ note_id }) => {
  // const note = useSelector((state) => select_note_by_id(state, note_id));

  const { note } = use_get_notes_query("notes_list", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[note_id],
    }),
  });

  const navigate = useNavigate();

  if (!note) return null;

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handle_edit = () => navigate(`/dash/notes/${note_id}`);

  return (
    <tr>
      <td className="table_cell note_status">
        {note.completed ? (
          <span className="note_status_completed">completed</span>
        ) : (
          <span className="note_status_open">open</span>
        )}
      </td>
      <td className="table_cell note_created">{created}</td>

      <td className="table_cell note_updated">{updated}</td>

      <td className="table_cell note_title">{note.title}</td>

      <td className="table_cell note_username">{note.username}</td>

      <td className="table_cell">
        <button onClick={handle_edit} className="icon_button table_button">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

const memoize_note = memo(Note);

Note.propTypes = {
  note_id: PropTypes.string.isRequired,
};

export default memoize_note;
