import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FaUser, FaEnvelope, FaLock, FaMobile, FaMapMarkerAlt } from 'react-icons/fa';
import MiniSpinner from '../../components/MiniSpinner';

const Profile = () => {

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { email, name, phoneNumber, address } = auth?.user;
    setName(name);
    setPhoneNumber(phoneNumber);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.put("/api/auth/update-profile", {
        name,
        email,
        password,
        phoneNumber,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  
  const handleTopScrollClick = () => {
    window.scrollTo(0, 0);
  };


  return (
    <div className="container mt-5 mb-5">
       <Helmet>
        <title>NexaHub |My Profile</title>
      </Helmet>
      <div className="row justify-content-center align-items-center ">
        <div className="col-md-8">
          <div className="card p-4 box-shadow">
          {loading && <MiniSpinner />}

            <h2 className="text-center mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <FaUser className="me-2" />
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope className="me-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <FaLock className="me-2" />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="password"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  <FaMobile className="me-2" />
                  Phone
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  <FaMapMarkerAlt className="me-2" />
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="address"
                  placeholder="Enter Your Address"
                />
              </div>

              <button type="submit" className="btn btn-primary" onClick={handleTopScrollClick}>
              {loading ? "please wait ..." : 'UPDATE'}

              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
