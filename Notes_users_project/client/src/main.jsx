import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// if (process.env.VITE_ENVIRONMENT === "production") disableReactDevTools();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
