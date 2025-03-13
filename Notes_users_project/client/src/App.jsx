import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Dash_layout from "./components/Dash_layout";
import Welcome from "./features/auth/Welcome";
import Notes_list from "./features/notes/Notes_list";
import Users_list from "./features/users/Users_list";
import Edit_user from "./features/users/Edit_user";
import New_user_form from "./features/users/New_user_form";
import Edit_note from "./features/notes/Edit_note";
import New_note from "./features/notes/New_note";
import Prefetch from "./features/auth/Prefetch";
import Persist_login from "./features/auth/Persist_login";
import Require_auth from "./features/auth/Require_auth";
import { ROLES } from "./config/roles";
import use_title from "./hooks/use_title";

const App = () => {
  use_title("Dan D. repairs");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="login" element={<Login />} />

        <Route element={<Persist_login />}>
          <Route
            element={<Require_auth allowed_roles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<Dash_layout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <Require_auth
                      allowed_roles={[ROLES.Admin, ROLES.Manager]}
                    />
                  }
                >
                  <Route path="users">
                    <Route index element={<Users_list />} />

                    <Route path=":id" element={<Edit_user />} />

                    <Route path="new" element={<New_user_form />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<Notes_list />} />

                  <Route path=":id" element={<Edit_note />} />

                  <Route path="new" element={<New_note />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
