import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import {
  RiHome2Line,
  RiStore2Line,
  RiInformationLine,
  RiContactsLine,
  RiMenu2Line,
} from "react-icons/ri";
import {
  FaMobile,
  FaHeart,
  FaUser,
  FaShoppingCart,
  FaEnvelope,
} from "react-icons/fa";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");

    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <header>
        <nav className="navbar-top-strip d-flex p-2">
          <div className="text-white mx-2">Welcome to nexaHub</div>
          <div className="mx-2 d-flex flex-wrap gap-15">
            <Link
              to="mailto:mrnamdev1372000@gmail.com"
              className="text-decoration-none text-white"
            >
              <FaEnvelope /> mrnamdev1372000@gmail.com
            </Link>

            <Link
              to="tel:+91 8120544147"
              className="text-white text-decoration-none"
            >
              <FaMobile /> 8120544147
            </Link>
          </div>
        </nav>

        <nav className="navbar navbar-middle navbar-expand-lg">
          <div className="container-fluid">
            <div>
              <h2 className="MainLogo">
                <Link to="/" className="text-decoration-none">
                  <span className="text-danger">Nexa</span>
                  <span className="text-white">Hub</span>
                </Link>
              </h2>
            </div>
            <button
              className="navbar-toggler bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <SearchInput/>

              <div className="ms-auto">
                <div className="d-flex flex-wrap gap-15">
                  <Link
                    className="d-flex align-items-center text-decoration-none"
                    to="/wishlist"
                  >
                    <FaHeart size={24} color="white" />
                    <p className="text-white mx-1 my-2">Wishlist</p>
                  </Link>

                  {!auth?.user ? (
                    <Link
                      className="d-flex align-items-center text-decoration-none p-0"
                      to="/login"
                    >
                      <FaUser size={24} color="white" />
                      <p className="text-white mx-1 my-2">Login/Signup</p>
                    </Link>
                  ) : (
                    <>
                      <li className="nav-item dropdown  text-white">
                        <Link
                          className="nav-link dropdown-toggle mt-2 "
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          <FaUser size={18} color="white" /> {auth?.user?.name}
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              to={
                                auth?.user?.role === "ADMIN"
                                  ? "/admin-panel"
                                  : "/user/profile"
                              }
                              className="dropdown-item"
                            >
                              { auth?.user?.role === "ADMIN" ? "Dashboard" :"My Profile"}
                            </Link>
                          </li>
                          <li>
                            <Link to="/user/orders" className="dropdown-item">
                              My Orders
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={handleLogout}
                              to="/login"
                              className="dropdown-item"
                            >
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </>
                  )}

                  <Link
                    className="d-flex align-items-center text-decoration-none"
                    to="/cart"
                  >
                    <FaShoppingCart size={24} color="white" />
                    <p className="text-white mx-1 my-2">Cart({cart?.length})</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <nav className="navbar-bottom py-3">
          <div className="container-xxl">
            <div className="d-flex flex-wrap">
              <div className="col-12">
                <div className="menu-bottom d-flex flex-wrap align-items-center gap-30">
                  <div>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-1 align-items-center me-5"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span>
                          <RiMenu2Line size={24} color="white" />
                        </span>
                        Shop Categories
                      </button>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li key="all-categories">
                          <Link className="dropdown-item" to={"/categories"}>
                            All Categories
                          </Link>
                        </li>
                        {categories?.map((k) => (
                          <li key={`${k._id}-${k.slug}`}>
                            <Link
                              className="dropdown-item"
                              to={`/category/${k.slug}`}
                            >
                              {k.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="menu-links d-flex flex-wrap">
                    <div className="d-flex flex-wrap align-items-center gap-15 text-white">
                      |
                      <NavLink
                        className="text-white d-flex gap-1 align-items-center text-decoration-none"
                        to="/"
                      >
                        <RiHome2Line size={24} color="white" />
                        <div>Home</div>
                      </NavLink>
                      <NavLink
                        className="text-white d-flex gap-1 align-items-center text-decoration-none"
                        to="/store"
                      >
                        <RiStore2Line size={24} color="white" />
                        <div>Store</div>
                      </NavLink>
                      <NavLink
                        className="text-white d-flex gap-1 align-items-center text-decoration-none"
                        to="/about-us"
                      >
                        <RiInformationLine size={24} color="white" />
                        <div>About Us</div>
                      </NavLink>
                      <NavLink
                        className="text-white d-flex gap-1 align-items-center text-decoration-none"
                        to="/contact-us"
                      >
                        <RiContactsLine size={24} color="white" />
                        <div>Contact Us</div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
