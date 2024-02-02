import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useWish } from "../context/wishlist";
import { BsFillHouseFill, BsBox, BsPlusSquare, BsList, BsClipboardCheck } from "react-icons/bs";
import { FaArrowRight } from 'react-icons/fa';
import toast from "react-hot-toast";

const AdminNav = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [wish, setWish] = useWish();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");

    setCart([]);
    localStorage.removeItem("cart");

    setWish([]);
    localStorage.removeItem("wish");

    toast.success("Logout Successfully");
  };

  return (
    <div className="text-center sticky-top">
      <div className="list-group ">
        <h3>Admin Panel</h3>
        <div className="box-shadow">
          <Link
            to="/admin-panel"
            className="list-group-item list-group-item-action"
          
          >
            <BsFillHouseFill /> Dashboard
          </Link>
          <NavLink
            to="create-category"
            className="list-group-item list-group-item-action"
          
          >
            <BsBox /> Create Category
          </NavLink>
          <NavLink
            to="create-product"
            className="list-group-item list-group-item-action"
           
          >
            <BsPlusSquare /> Create Product
          </NavLink>
          <NavLink
            to="all-products"
            className="list-group-item list-group-item-action"
           
          >
            <BsList /> All Products
          </NavLink>
          <NavLink
            to="all-orders"
            className="list-group-item list-group-item-action"
        
          >
            <BsClipboardCheck /> All Orders
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action"
            onClick={handleLogout}
            to="/"
          >
            <FaArrowRight />Log Out
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
