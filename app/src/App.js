import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivacyPolicy from "./pages/MainPages/PrivacyPolicy";
import TermsOfService from "./pages/MainPages/TermsOfService";
import RefundPolicy from "./pages/MainPages/RefundPolicy";
import AboutUs from "./pages/MainPages/AboutUs";
import ShippingPolicy from "./pages/MainPages/ShippingPolicy";
import Home from "./pages/MainPages/Home";
import ContactUs from "./pages/MainPages/ContactUs";
import Pagenotfound from "./pages/Pagenotfound";
import ForgotPassword from "./pages/AuthRelatedPage/ForgotPassword";
import Signup from "./pages/AuthRelatedPage/Signup";
import Login from "./pages/AuthRelatedPage/Login";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import Profile from "./pages/Users/Profile";
import AdminPanel from "./pages/Admin/AdminPanel";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import AllOrders from "./pages/Admin/AllOrders";
import AllProducts from "./pages/Admin/AllProducts";
import AdminPanelLayout from "./layouts/AdminPanelLayout";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import OurStore from "./pages/MainPages/OurStore";
import Search from "./pages/MainPages/Search";
import ProductDetails from "./pages/MainPages/ProductDetails";
import AllCategoriesPAGE from "./pages/MainPages/AllCategoriesPAGE";
import SingleCategoryPage from "./pages/MainPages/SingleCategoryPage";
import Cart from "./pages/MainPages/Cart";
import Wishlist from "./pages/MainPages/Wishlist";
import MyOrder from "./pages/Users/MyOrder";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="termsOfService" element={<TermsOfService />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart/>} />
            <Route path="wishlist" element={<Wishlist/>} />
            <Route path="store" element={<OurStore/>} />
            <Route path="product/:slug" element={<ProductDetails/>} />
            <Route path="categories" element={<AllCategoriesPAGE/>} />
            <Route path="category/:slug" element={<SingleCategoryPage/>} />
            <Route path="search" element={<Search/>} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            

            <Route path="user" element={<ProtectedUserRoute />}>
              <Route index element={<Home/>} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<MyOrder/>} />
            </Route>

            <Route path="admin-panel" element={<AdminPanelLayout />}>
              <Route index element={<AdminPanel/>} />
              <Route path= 'create-category' element={<CreateCategory/>} />
              <Route path= 'create-product' element={<CreateProduct/>} />
              <Route path= 'all-Orders' element={<AllOrders/>} />
              <Route path= 'all-products' element={<AllProducts/>} />
              <Route path= 'all-products/:slug' element={<ProductUpdate/>} />

            </Route>

            <Route path="*" element={<Pagenotfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
