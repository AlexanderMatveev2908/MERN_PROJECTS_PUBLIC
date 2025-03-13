import { store } from "../../app/store";
import { notes_api_slice } from "./../notes/notes_api_slice";
import { users_api_slice } from "./../users/users_api_slice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    // const notes = store.dispatch(notes_api_slice.endpoints.getNotes.initiate());
    // const users = store.dispatch(users_api_slice.endpoints.getUsers.initiate());
    store.dispatch(
      notes_api_slice.util.prefetch("getNotes", "notes_list", { force: true })
    );
    store.dispatch(
      users_api_slice.util.prefetch("getUsers", "users_list", { force: true })
    );
    // return () => {
    //   notes.unsubscribe();
    //   users.unsubscribe();
    // };
  }, []);

  return <Outlet />;
};

export default Prefetch;
