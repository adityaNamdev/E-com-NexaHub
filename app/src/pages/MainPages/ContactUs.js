import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaComment, FaArrowRight, FaMobile } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import MiniSpinner from '../../components/MiniSpinner'; 

const ContactUs = () => {
  const navigate = useNavigate(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('/api/contact/saveContactData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast.success('Thanks for feedback! Our team will contact you soon.');
        setName('');
        setEmail('');
        setMessage('');
        navigate('/'); 
      } else {
        toast.error('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleTopScrollClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container my-5 contact-us-page">
      <Helmet>
        <title>NexaHub | Contact Us</title>
      </Helmet>
      <div className="row">
      {loading && <MiniSpinner />}
        <div className="col-lg-6 contact-content">
          <h1>Welcome to Our Website!</h1>
          <p>
            Thank you for visiting our website. We are dedicated to providing valuable information
            and excellent services. If you have any questions, feedback, or inquiries, feel free to
            reach out to us using the contact form below. We would love to hear from you!
          </p>
          <h2>Our Location</h2>
          <p>We are located in the heart of India[M.P.], easily accessible and ready to assist you.</p>
          <p>
            <FaEnvelope /> Email: mrnamdev1372000@gmail.com
            <br />
            <FaMobile /> Phone: +91-8120544147
          </p>
        </div>
        <div className="col-lg-6 contact-us-container ">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <FaUser /> Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <FaEnvelope /> Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                <FaComment /> Message:
              </label>
              <textarea
                className="form-control"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary"
            onClick={handleTopScrollClick}>
              {loading ?  "please wait...": 'Submit'} <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
