import { Link } from "react-router-dom";
import use_auth from "../../hooks/use_auth";

const Welcome = () => {
  const { username, is_manager, is_admin } = use_auth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>

      <h1>welcome {username}</h1>

      <p>
        <Link to={"/dash/notes"}>view techNotes</Link>
      </p>

      <p>
        <Link to={"/dash/notes/new"}>add new techNote</Link>
      </p>

      {(is_admin || is_manager) && (
        <p>
          <Link to={"/dash/users"}>view users settings</Link>
        </p>
      )}

      {(is_admin || is_manager) && (
        <p>
          <Link to={"/dash/users/new"}>add new user</Link>
        </p>
      )}
    </section>
  );
};

export default Welcome;
