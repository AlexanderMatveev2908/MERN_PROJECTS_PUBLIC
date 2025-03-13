import { useState, useEffect } from "react";
import {
  use_update_user_mutation,
  use_delete_user_mutation,
} from "./users_api_slice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { PropTypes } from "prop-types";

const USER_REGEX = /^[A-Za-z']{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;

const Edit_user_form = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    use_update_user_mutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = use_delete_user_mutation();

  const navigate = useNavigate();

  const [username, set_username] = useState(user.username);
  const [valid_username, set_valid_username] = useState(false);
  const [password, set_password] = useState("");
  const [valid_password, set_valid_password] = useState(false);
  const [roles, set_roles] = useState(user.roles);
  const [active, set_active] = useState(user.active);

  useEffect(() => set_valid_username(USER_REGEX.test(username)), [username]);

  useEffect(() => set_valid_password(PWD_REGEX.test(password)), [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      set_username("");
      set_password("");
      set_roles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const on_username_change = (e) => set_username(e.target.value);
  const on_password_change = (e) => set_password(e.target.value);
  const on_roles_change = (e) => {
    const selected_values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    set_roles(selected_values);
  };
  const on_active_change = () => set_active((prev) => !prev);

  const on_save_user_click = async (e) => {
    e.preventDefault();

    if (password)
      await updateUser({ id: user.id, username, password, roles, active });
    else await updateUser({ id: user.id, username, roles, active });
  };

  const on_delete_user_click = async (e) => {
    e.preventDefault();
    await deleteUser({ id: user.id });
  };

  const options = Object.entries(ROLES).map(([key, value]) => (
    <option key={value} value={value}>
      {key}
    </option>
  ));

  let can_save;

  if (password)
    can_save =
      [roles.length, valid_username, valid_password].every(Boolean) &&
      !isLoading;
  else can_save = [roles.length, valid_username].every(Boolean) && !isLoading;

  const err_class = isError || isDelError ? "err_msg" : "offscreen";
  const valid_user_class = !valid_username ? "form_input_incomplete" : "";
  const valid_pwd_class =
    password && !valid_password ? "form_input_incomplete" : "";
  const valid_roles_class = !roles.length ? "form_input_incomplete" : "";
  const err_content = error?.data?.message || delError?.data?.message || "";

  return (
    <>
      <p className={err_class}>{err_content}</p>

      <form className="form">
        <div className="form_title_row">
          <h2>edit user</h2>
          <div className="form_action_buttons">
            <button
              className="icon_button"
              title="save"
              onClick={on_save_user_click}
              disabled={!can_save}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>

            <button
              className="icon_button"
              title="delete"
              onClick={on_delete_user_click}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        <label htmlFor="username" className="form_label">
          username: <span className="nowrap">[3-20 characters]</span>
        </label>

        <input
          id="username"
          name="username"
          className={`form_input ${valid_user_class}`}
          autoComplete="off"
          value={username}
          onChange={on_username_change}
          type="text"
        />

        <label htmlFor="password" className="form_label">
          password: <span className="nowrap">[empty = no change]</span>
        </label>

        <input
          id="password"
          name="password"
          className={`form_input ${valid_pwd_class}`}
          autoComplete="off"
          value={password}
          onChange={on_password_change}
          type="password"
        />

        <label
          htmlFor="user_active"
          className="label_form form_checkbox_container"
        >
          active:
          <input
            id="user_active"
            name="user_active"
            checked={active}
            onChange={on_active_change}
            className="form_checkbox"
            type="checkbox"
          />
        </label>

        <label htmlFor="roles" className="form_label">
          assigned roles:
        </label>

        <select
          id="roles"
          name="roles"
          className={`form_select ${valid_roles_class}`}
          multiple
          size="3"
          value={roles}
          onChange={on_roles_change}
        >
          {options}
        </select>
      </form>
    </>
  );
};

Edit_user_form.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Edit_user_form;
