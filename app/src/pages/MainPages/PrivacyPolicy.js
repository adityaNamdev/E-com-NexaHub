import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const currentDate = getCurrentDate();
  return (
    <div className="container my-3">
      <Helmet>
        <title>NexaHub|Privacy Policy</title>
      </Helmet>

      <h1 className="text-center my-3">Privacy Policy - nexaHub</h1>

      <p>
        <strong>Date:</strong>
        {currentDate}
      </p>

      <p>
        Thank you for visiting nexaHub, an ecommerce website dedicated to
        providing you with a seamless and secure shopping experience. Your
        privacy is important to us, and we are committed to protecting and
        safeguarding your personal information. This Privacy Policy outlines how
        we collect, use, disclose, and protect your information when you use our
        website and services.
      </p>

      <p>
        By accessing or using nexaHub, you agree to the terms outlined in this
        Privacy Policy. Please take the time to read this document carefully.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect various types of information to provide and improve our
        services to you. The types of information we collect include:
      </p>
      <ul>
        <li>
          Personal Information: This includes your name, contact details,
          shipping address, and payment information.
        </li>
        <li>
          Non-Personal Information: We may collect non-personal information such
          as your IP address, browser type, and device information to enhance
          our website's performance and your user experience.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>To process and fulfill your orders.</li>
        <li>
          To communicate with you about your orders and provide customer
          support.
        </li>
        <li>To personalize and improve your shopping experience on nexaHub.</li>
        <li>
          To send you promotional offers, newsletters, and updates if you have
          opted in to receive them.
        </li>
        <li>To prevent fraud and enhance the security of our website.</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>
        We do not sell, trade, or rent your personal information to third
        parties. However, we may share your information with trusted third-party
        service providers who assist us in operating our website and conducting
        our business, as long as they agree to keep this information
        confidential.
      </p>

      <h2>4. Cookies and Tracking Technologies</h2>
      <p>
        nexaHub uses cookies and similar tracking technologies to enhance your
        user experience, analyze website usage, and improve our marketing
        efforts. You can choose to disable cookies through your browser
        settings, but this may affect certain functionalities of the website.
      </p>

      <h2>5. Your Choices and Rights</h2>
      <p>
        You have the right to access, update, and delete your personal
        information. You can also choose to opt-out of receiving promotional
        communications from us. To exercise these rights, please contact us at
        [mrnamdev1372000@gmail.com].
      </p>

      <h2>6. Security Measures</h2>
      <p>
        We implement industry-standard security measures to protect your
        information from unauthorized access, disclosure, alteration, and
        destruction. Despite our best efforts, no online platform can guarantee
        absolute security.
      </p>

      <h2>7. Changes to this Privacy Policy</h2>
      <p>
        We reserve the right to update and modify this Privacy Policy at any
        time. Any changes will be posted on this page with an updated effective
        date. We encourage you to review this Privacy Policy periodically.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy
        Policy, please contact us at [mrnamdev1372000@gmail.com].
      </p>

      <p>
        Thank you for trusting nexaHub with your personal information. We are
        dedicated to providing you with a secure and enjoyable shopping
        experience.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
