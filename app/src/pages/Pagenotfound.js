import React from "react";
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from "react-router-dom";

const Pagenotfound = () => {
  const navigate = useNavigate();

  return (
    <div className="pagenotfound">
      <Helmet>
        <title>NexaHub|Page Not found</title>
      </Helmet>
      <h1 className="PNF-title">404</h1>
      <p>Oops! Page Not Found</p>
      <button onClick={() => navigate(-1)} className="pnf-btn">
        Go Back
      </button>
    </div>
  );
};

export default Pagenotfound;
