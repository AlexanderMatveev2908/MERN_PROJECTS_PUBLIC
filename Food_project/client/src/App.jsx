import { Route, Routes } from "react-router-dom";
import Navbar from "./comp/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./comp/Footer/Footer";
import LoginPopup from "./comp/LoginPopup/LoginPopup";
import LayoutPlaceOrder from "./pages/LayoutPlaceOrder/LayoutPlaceOrder";
import NotFound from "./pages/NotFound/NotFound";
import Verify from "./pages/Verify/Verify";
import { ToastContainer } from "react-toastify";
import Orders from "./pages/Orders/Orders";
import OrdersLayout from "./pages/OrdersLayout/OrdersLayout";
import { useGlobal } from "./hooks/useGlobal";

const App = () => {
  const { showLogin, setShowLogin } = useGlobal();

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup {...{ setShowLogin }} /> : <></>}
      <div className="app">
        <Navbar {...{ setShowLogin }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<LayoutPlaceOrder />}>
            <Route index element={<PlaceOrder />} />
          </Route>
          <Route path="/verify" element={<Verify />} />
          <Route path="/orders" element={<OrdersLayout />}>
            <Route index element={<Orders />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default App;
