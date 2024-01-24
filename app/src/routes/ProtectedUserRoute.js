import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import RedirectingPage from "../pages/RedirectingPage";
import { Outlet } from "react-router-dom";


export default function ProtectedUserRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/auth/user-dashboard");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet/>: <RedirectingPage/>
}
