import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RedirectingPage from "../pages/RedirectingPage";

export default function ProtectedAdminRoute() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/auth/admin-panel");
        console.log("API Response:", res.data);
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
      console.log("Checking authentication...");
      authCheck();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (isAdmin) {
      // Navigate to admin dashboard page
      navigate("/admin-panel");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
   
    return <RedirectingPage />;
  }
  return null;
}
