import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { AiOutlineMail } from 'react-icons/ai';

const TermsOfService = () => {
  return (
    <div className="container my-3">
      <Helmet>
        <title>NexHub|Term of Service</title>
      </Helmet>

      <h1 className="text-center my-3">Terms of Service</h1>

      <p>
        By using the nexaHub website, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully. If you do not agree to these terms, you should not use this website.
      </p>

      <h2>1. Use of the Website</h2>
      <p>
        The content of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
      </p>

      <h2>2. Account Registration</h2>
      <p>
        In order to access certain features of the website, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information and password.
      </p>

      <h2>3. Product Information</h2>
      <p>
        We strive to provide accurate product information, but we do not warrant the completeness, accuracy, or reliability of any product information. Prices and availability are subject to change without notice.
      </p>

      <h2>4. User Conduct</h2>
      <p>
        You agree not to use the website for any unlawful purpose or any purpose prohibited under this agreement. You may not use the website in any manner that could damage, disable, overburden, or impair the website.
      </p>

      <h2>5. Privacy Policy</h2>
      <p>
        Your use of the website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        In no event will nexaHub be liable for any direct, indirect, special, consequential, or incidental damages arising out of or in connection with the use of this website.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes will be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        nexaHub reserves the right to modify these terms of service at any time. Any changes will be effective immediately upon posting on the website.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        If you have any questions about these terms of service, please contact us at{' '}
        <Link to="mailto:mrnamdev1372000@gmail.com" className='text-decoration-none text-black'>
        <AiOutlineMail />[mrnamdev1372000@gmail.com]
        </Link>
      </p>
    </div>
  );
};

export default TermsOfService;
