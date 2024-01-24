import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";
import { FaArrowRight } from 'react-icons/fa';
import MiniSpinner from "../../components/MiniSpinner";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth(); 




  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(res.data.user.role === "ADMIN" ? "/admin-panel" : "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };


  const handleTopScrollClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>NexaHub|Login</title>
      </Helmet>
      <div className="container mt-3 mb-3">
      {loading && <MiniSpinner />}
        <div className="card mx-auto login-container" style={{ maxWidth: "400px" }}>
          <div className="card-body">
            <h1 className="card-title text-center">Login</h1>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y btn btn-link eyeopenclose"
                onClick={() => {
                  setShowPassword(!showPassword);
                  setEyeOpen(!eyeOpen);
                }}
              >
                {eyeOpen ? <BsEyeFill /> : <BsEyeSlash />}
              </span>
            </div>

            <p className="mb-3">
              Don't have an account?{" "}
              <Link to="/signup" onClick={handleTopScrollClick} className="text-decoration-none" >
                Sign Up
              </Link>
            </p>

            <button
              onClick={handleLogin}
              className={`btn btn-primary w-100 mb-3 ${loading ? 'disabled' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'} <FaArrowRight />
            </button>

            <div className="text-center">
              <Link className="text-decoration-none"  to="/forgot-password">
                  Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
