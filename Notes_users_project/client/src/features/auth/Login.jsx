import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set_credentials } from "./auth_slice";
import { use_login_mutation } from "./auth_api_slice";
import use_persist from "../../hooks/use_persist";
import { PulseLoader } from "react-spinners";

const Login = () => {
  const user_ref = useRef();
  const err_ref = useRef();

  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [err_msg, set_err_msg] = useState("");

  const [persist, set_persist] = use_persist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = use_login_mutation();

  useEffect(() => user_ref.current.focus(), []);

  useEffect(() => set_err_msg(""), [username, password]);

  const handle_submit = async (e) => {
    e.preventDefault();

    try {
      const { access_token } = await login({ username, password }).unwrap();

      dispatch(set_credentials({ access_token }));

      set_username("");
      set_password("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) set_err_msg("=> no server response ");
      else if (err.status === 400) set_err_msg("=> invalid credentials");
      else if (err.status === 401) set_err_msg("=> unauthorized");
      else if (err.status === 429) set_err_msg(err?.data?.message?.message);
      else if (err.status === "FETCH_ERROR") set_err_msg(err.error);
      else set_err_msg(err?.data?.message);
      console.log(err);

      err_ref.current.focus();
    }
  };

  const handle_user_input = (e) => set_username(e.target.value);
  const handle_password_input = (e) => set_password(e.target.value);

  const handle_toggle = () => set_persist((prev) => !prev);

  const err_class = err_msg ? "error" : "";

  return (
    <section className="public">
      <header>
        <h1>employee login</h1>
      </header>
      <main className="login">
        <p ref={err_ref} className={err_class} aria-live="assertive">
          {err_msg}
        </p>

        <form onSubmit={handle_submit} className="form">
          <label htmlFor="username">username</label>

          <input
            type="text"
            className="form_input"
            id="username"
            name="username"
            required
            autoComplete="off"
            ref={user_ref}
            value={username}
            onChange={handle_user_input}
          />

          <label htmlFor="password">password</label>

          <input
            type="password"
            className="form_input"
            id="password"
            name="password"
            required
            autoComplete="off"
            value={password}
            onChange={handle_password_input}
          />

          <button className="form_submit_button">
            {isLoading ? <PulseLoader color="#36d399" size={15} /> : "login"}
          </button>
        </form>
      </main>

      <label htmlFor="persist" className="form_persist">
        <input
          type="checkbox"
          className="form_checkbox"
          id="persist"
          name="persist"
          checked={persist}
          onChange={handle_toggle}
        />
        trust this device
      </label>

      <footer>
        <Link to={"/"}>home</Link>
      </footer>
    </section>
  );
};

export default Login;
