import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import LayoutProtection from "./pages/LayoutProtection/LayoutProtection";
import { useGlobal } from "./hooks/useGlobal";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { token } = useGlobal();

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {!token ? (
        <Login />
      ) : (
        <>
          <Navbar />

          <hr className="border-none bg-gray-300 h-[1px]" />
          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<LayoutProtection />}>
                  <Route path="add" element={<Add />} />

                  <Route path="list" element={<List />} />

                  <Route path="orders" element={<Orders />} />
                </Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default App;
