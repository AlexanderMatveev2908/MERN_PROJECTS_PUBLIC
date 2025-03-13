import { useState, useEffect } from "react";
import { use_add_user_mutation } from "./users_api_slice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-Za-z']{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;

const New_user_form = () => {
  const [addUser, { isLoading, isSuccess, isError, error }] =
    use_add_user_mutation();

  const navigate = useNavigate();

  const [username, set_username] = useState("");
  const [valid_username, set_valid_username] = useState(false);
  const [password, set_password] = useState("");
  const [valid_password, set_valid_password] = useState(false);
  const [roles, set_roles] = useState([]);

  useEffect(() => set_valid_username(USER_REGEX.test(username)), [username]);

  useEffect(() => set_valid_password(PWD_REGEX.test(password)), [password]);

  useEffect(() => {
    if (isSuccess) {
      set_username("");
      set_password("");
      set_roles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const on_username_change = (e) => set_username(e.target.value);
  const on_password_change = (e) => set_password(e.target.value);
  const on_roles_change = (e) => {
    const selected_values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    set_roles(selected_values);
  };

  const can_save =
    [roles.length, valid_username, valid_password].every(Boolean) && !isLoading;

  const on_save_user_click = async (e) => {
    e.preventDefault();

    if (can_save) await addUser({ username, password, roles });
  };

  const options = Object.entries(ROLES).map(([key, value]) => (
    <option value={value} key={value}>
      {key}
    </option>
  ));

  const err_class = isError ? "err_msg" : "offscreen";
  const valid_user_class = !valid_username ? "form_input_incomplete" : "";
  const valid_pwd_class = !valid_password ? "form_input_incomplete" : "";
  const valid_roles_class = !roles.length ? "form_input_incomplete" : "";

  return (
    <>
      <p className={err_class}>{error?.data?.message}</p>

      <form className="form" onSubmit={on_save_user_click}>
        <div className="form_title_row">
          <h2>new user</h2>
          <div className="form_action_buttons">
            <button className="icon_button" title="save" disabled={!can_save}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label htmlFor="username" className="form_label">
          username: <span className="nowrap">[3-20 characters]</span>
        </label>

        <input
          type="text"
          className={`form_input ${valid_user_class}`}
          id="username"
          name="username"
          autoComplete="off"
          value={username}
          onChange={on_username_change}
        />

        <label htmlFor="password" className="form_label">
          password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>

        <input
          type="password"
          className={`form_input ${valid_pwd_class}`}
          id="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={on_password_change}
        />

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

export default New_user_form;
