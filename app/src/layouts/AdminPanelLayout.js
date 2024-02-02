import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RedirectingPage from "../pages/RedirectingPage";
import AdminNav from "../components/AdminNav";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const AdminPanelLayout = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/auth/admin-panel");

        if (res.data.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsAdmin(false);
      }
    };

    if (auth?.token) {
     
      authCheck();
    }
  }, [auth?.token]);

  if (!isAdmin) {
    
    return <RedirectingPage />;
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-md-3">
          <AdminNav className='sticky-top' />
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelLayout;