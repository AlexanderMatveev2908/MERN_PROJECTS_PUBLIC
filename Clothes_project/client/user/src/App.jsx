import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Collection from "./pages/Collection/Collection";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import { ToastContainer } from "react-toastify";
import LayoutListOrders from "./pages/LayoutListOrders/LayoutListOrders";
import LayoutPlaceOrder from "./pages/LayoutPlaceOrder/LayoutOrders";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./pages/Verify/Verify";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      <Navbar />

      <SearchBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/collection" element={<Collection />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/product/:productId" element={<Product />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/orders" element={<LayoutListOrders />}>
          <Route index element={<Orders />} />
        </Route>

        <Route path="/place-order" element={<LayoutPlaceOrder />}>
          <Route index element={<PlaceOrder />} />
        </Route>

        <Route path="/verify" element={<Verify />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};
export default App;
