import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  use_update_note_mutation,
  use_delete_note_mutation,
} from "./notes_api_slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import use_auth from "../../hooks/use_auth";

const Edit_note_form = ({ users, note }) => {
  const { is_manager, is_admin } = use_auth();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    use_update_note_mutation();

  const [
    deleteNote,
    {
      isLoading: idDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError,
    },
  ] = use_delete_note_mutation();

  const navigate = useNavigate();

  const [title, set_title] = useState(note.title);
  const [text, set_text] = useState(note.text);
  const [completed, set_completed] = useState(note.completed);
  const [user_id, set_user_id] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      set_title("");
      set_text("");
      set_user_id("");
      navigate("/dash/notes");
    }
  }, [navigate, isDelSuccess, isSuccess]);

  const on_title_change = (e) => set_title(e.target.value);
  const on_text_change = (e) => set_text(e.target.value);
  const on_completed_change = () => set_completed((prev) => !prev);
  const on_user_id_change = (e) => set_user_id(e.target.value);

  const can_save =
    [title, text, user_id].every(Boolean) && !isLoading && !idDelLoading;

  const on_save_note_click = async (e) => {
    e.preventDefault();

    if (can_save)
      await updateNote({
        user: user_id,
        id: note.id,
        title,
        text,
        completed,
      });
  };

  const on_delete_note_click = async (e) => {
    e.preventDefault();
    await deleteNote({ id: note.id });
  };

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

  const options = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const err_class = isError || isDelError ? "err_msg" : "offscreen";
  const valid_title_class = !title ? "form_input_incomplete" : "";
  const valid_text_class = !text ? "form_input_incomplete" : "";

  const err_content = error?.data?.message || delError?.data?.message || "";

  let delete_btn = null;

  if (is_manager || is_admin)
    delete_btn = (
      <button
        className="icon_button"
        title="delete"
        onClick={on_delete_note_click}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );

  return (
    <>
      <p className={err_class}>{err_content}</p>

      <form className="form">
        <div className="form_title_row">
          <h2>edit note</h2>
          <div className="form_action_buttons">
            <button
              className="icon_button"
              title="save"
              disabled={!can_save}
              onClick={on_save_note_click}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>

            {delete_btn}
          </div>
        </div>

        <label className="form_label" htmlFor="note_title">
          title:
        </label>

        <input
          type="text"
          className={`form_input ${valid_title_class}`}
          id="note_title"
          name="note_title"
          autoComplete="off"
          value={title}
          onChange={on_title_change}
        />

        <label htmlFor="note_test" className="form_label">
          text:
        </label>

        <textarea
          name="note_test"
          id="note_test"
          className={`form_input form_input_text ${valid_text_class}`}
          value={text}
          onChange={on_text_change}
        />

        <div className="form_row">
          <div className="form_divider">
            <label
              htmlFor="note_completed"
              className="form_label form_checkbox_container"
            >
              work completed:
              <input
                className="form_checkbox"
                id="note_completed"
                name="note_completed"
                checked={completed}
                onChange={on_completed_change}
                type="checkbox"
              />
            </label>

            <label
              htmlFor="note_username"
              className="form_label checkbox_container"
            >
              <select
                name="note_username"
                id="note_username"
                className="form_select"
                value={user_id}
                onChange={on_user_id_change}
              >
                {options}
              </select>
            </label>
          </div>

          <div className="form_divider">
            <p className="form_created">
              created: <br /> {created}
            </p>

            <p className="form_updated">
              updated: <br /> {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

Edit_note_form.propTypes = {
  users: PropTypes.array.isRequired,
  note: PropTypes.object.isRequired,
};

export default Edit_note_form;
