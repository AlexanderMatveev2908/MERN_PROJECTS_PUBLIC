import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalContextProvider from "./Context/GlobalContext/GlobalContextProvider.jsx";
// import AppProvider from "./Context/AppProvider/AppProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    {/* <AppProvider> */}
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
    {/* </AppProvider> */}
  </Router>
);
