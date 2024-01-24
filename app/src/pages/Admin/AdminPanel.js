import React from "react";
import { useAuth } from "../../context/auth";
import { Helmet } from "react-helmet";
import { FaUser, FaEnvelope } from "react-icons/fa";
const AdminPanel = () => {
  const [auth] = useAuth();

  return (
    
    <div className="container-fluid">
      <Helmet>
        <title>NexaHub|Admin Dashboard</title>
      </Helmet>
      <div className="row">
        <main>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-3 bg-desire">
            <h1>Dashboard</h1>
          </div>

      
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h1>Admin details</h1>
                    <div>
                      <FaUser  />
                      <span> Name &rArr; </span>
                      <span className="text-bold">{auth?.user?.name}</span>
                    </div>
                    <div>
                      <FaEnvelope  />
                      <span> Email &rArr; </span>
                      <span className="text-bold">{auth?.user?.email}</span>
                   </div> 
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
