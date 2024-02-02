import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { Helmet } from "react-helmet";

const Redirect = ({ path = "login" }) => {
  const [count, setCount] = useState(7);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, {
        state: { from: location.pathname },
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Helmet>
        <title>NexaHub | please wait...</title>
      </Helmet>
      <h2 className="text-center m-0">
        <span>Redirecting in {count} seconds</span>
        <BsArrowRight style={{ marginLeft: "0.5rem" }} />
      </h2>
      <br />
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="pagenotfound">
        <h1 className="PNF-title">404 Error </h1>
        <p className="text-center">Oops!! Page Not Found</p>
        <p className="text-center">It seems like the page you are looking for does not exist.</p>
        <p className="text-center">You will be redirected to the {path} page shortly.</p>
      </div>
    </div>
  );
};

export default Redirect;
