import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { use_add_note_mutation } from "./notes_api_slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const New_note_form = ({ users }) => {
  const [addNote, { isLoading, isSuccess, isError, error }] =
    use_add_note_mutation();

  const navigate = useNavigate();

  const [title, set_title] = useState("");
  const [text, set_text] = useState("");
  const [user_id, set_user_id] = useState(users[0]?.id);

  useEffect(() => {
    if (isSuccess) {
      set_title("");
      set_text("");
      set_user_id("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const on_title_change = (e) => set_title(e.target.value);
  const on_text_change = (e) => set_text(e.target.value);
  const on_user_id_change = (e) => set_user_id(e.target.value);

  const can_save = [title, text, user_id].every(Boolean) && !isLoading;

  const on_save_note_click = async (e) => {
    e.preventDefault();

    if (can_save) await addNote({ title, text, user: user_id });
  };

  const options = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const err_class = isError ? "err_msg" : "offscreen";
  const valid_title_class = !title ? "form_input_incomplete" : "";
  const valid_text_class = !text ? "form_input_incomplete" : "";

  return (
    <>
      <p className={err_class}>{error?.data?.message}</p>

      <form className="form" onSubmit={on_save_note_click}>
        <div className="form_title_row">
          <h2>new note</h2>
          <div className="form_action_buttons">
            <button className="icon_button" title="save" disabled={!can_save}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label htmlFor="title" className="form_label">
          title:
        </label>

        <input
          type="text"
          className={`form_input ${valid_title_class}`}
          id="title"
          name="title"
          autoComplete="off"
          value={title}
          onChange={on_title_change}
        />

        <label htmlFor="text" className="form_label">
          test:
        </label>

        <textarea
          name="text"
          id="text"
          className={`form_input form_input_text ${valid_text_class}`}
          value={text}
          onChange={on_text_change}
        ></textarea>

        <label
          htmlFor="username"
          className="form_label form_checkbox_container"
        >
          assigned to:
          <select
            name="username"
            id="username"
            className="form_select"
            value={user_id}
            onChange={on_user_id_change}
          >
            {options}
          </select>
        </label>
      </form>
    </>
  );
};

New_note_form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default New_note_form;
