import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import RedirectingPage from "../pages/RedirectingPage";
import Dashboard from "../pages/User/Dashboard";

const AuthenticateUser = () => {
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/auth/user-dashboard");
        if (!res.data.ok) {
          navigate("/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in authentication check:", error);

        navigate("/login");
      }
    };

    if (!auth?.token) {
      navigate("/login");
    } else {
      authCheck();
    }
  }, [auth?.token, navigate]);

  if (loading) {
    return <RedirectingPage />;
  }

  return auth?.token ? (
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AuthenticateUser;
