import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from 'react-hot-toast';
import { FaArrowRight } from 'react-icons/fa';
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import MiniSpinner from "../../components/MiniSpinner";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleForgotPassword = async () => {

    try {
      setLoading(true);

    
      if (!validatePassword(newPassword)) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, securityAnswer, newPassword }),
      });



      const data = await response.json();

      console.log("Forgot Password response:", data);

      if (response.ok && data.success) {
        // Successful request for password reset
        toast.success(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setEmail("");
        setSecurityAnswer("");
        setNewPassword("");
        setShowNewPassword(false);
        setEyeOpen(false);
      } else {
        toast.error(data.message);
        setEmail("");
        setSecurityAnswer("");
        setNewPassword("");
        setShowNewPassword(false);
        setEyeOpen(false);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error during forgot password:", error.message);

      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  return (
    <>
      <Helmet>
        <title>NexaHub | ForgotPassword</title>
      </Helmet>
      <div className="container mt-3 mb-3">
        {loading && <MiniSpinner />}
        <div className="card mx-auto forgot-password-container" style={{ maxWidth: "400px" }}>
          <div className="card-body">
            <h1 className="card-title text-center">Forgot Password</h1>

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

            <div className="mb-3">
              <label htmlFor="securityQuestionAnswer" className="form-label">
                Security Question Answer:
              </label>
              <input
                type="text"
                id="securityQuestionAnswer"
                placeholder="What is your best friend's name?"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password:
              </label>
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  required
                />
                 {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                <span
                  className="position-absolute top-50 end-0 translate-middle-y btn btn-link"
                  onClick={() => {
                    setShowNewPassword(!showNewPassword);
                    setEyeOpen(!eyeOpen);
                  }}
                >
                  {eyeOpen ? <BsEyeFill /> : <BsEyeSlash />}
                </span>
              </div>
            </div>

            <p className="mb-3">
              Remember your password?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>

            <button
              onClick={handleForgotPassword}
              className={`btn btn-primary w-100 mb-3 ${loading ? 'disabled' : ''}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Submit'} <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
