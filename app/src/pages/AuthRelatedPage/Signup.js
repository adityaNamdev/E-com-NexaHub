import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaMobile, FaKey, FaHome, FaArrowRight } from 'react-icons/fa';
import MiniSpinner from "../../components/MiniSpinner";

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    securityAnswer: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset errors when the user changes the corresponding field
    if (name === 'password') {
      setPasswordError('');
    } else if (name === 'phoneNumber') {
      setPhoneNumberError('');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length < 10) {
      setPhoneNumberError('Enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and phone number
    if (!validatePassword(formData.password) || !validatePhoneNumber(formData.phoneNumber)) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        securityAnswer: formData.securityAnswer,
        address: formData.address,
      });

      if (res && res.data.success) {
        setTimeout(() => {
          setLoading(false);
          toast.success(res.data && res.data.message);
          navigate('/login');
        }, 3000);
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }

    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      securityAnswer: '',
      address: '',
    });
  };

  const handleTopScrollClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mt-3 mb-3">
      <Helmet>
        <title>NexaHub|Sign Up</title>
      </Helmet>
      <div className="card mx-auto signup-card">
        {loading && <MiniSpinner />}
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <FaUser className='icon-color'/> Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <FaEnvelope className='icon-color' /> Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              <FaMobile className='icon-color'/> Phone Number:
            </label>
            <input
              type="tel"
              className={`form-control ${phoneNumberError ? 'is-invalid' : ''}`}
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {phoneNumberError && <div className="invalid-feedback">{phoneNumberError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <FaKey className='icon-color'/> Password:
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
               {passwordError && <div className="invalid-feedback">{passwordError}</div>}
              <span
                className="position-absolute top-50 end-0 translate-middle-y btn btn-link"
                onClick={handleTogglePassword}
              >
                {showPassword ? <BsEyeFill /> : <BsEyeSlash />}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
             <FaHome className='icon-color'/> Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="securityAnswer" className="form-label">
              What is your best friend's name?
            </label>
            <input
              placeholder="Security Question"
              type="text"
              className="form-control"
              id="securityAnswer"
              name="securityAnswer"
              value={formData.securityAnswer}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleTopScrollClick}>
            Sign Up <FaArrowRight />
          </button>
        </form>
        <div className="mt-3 text-center">
          <p>
            If you already have an account, please{' '}
            <Link to="/login" onClick={handleTopScrollClick}>
              login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
