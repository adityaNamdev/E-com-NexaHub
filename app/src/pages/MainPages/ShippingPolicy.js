import React from "react";
import { Helmet } from "react-helmet";
import {
  FaTruck,
  FaClock,
  FaEnvelope,
  FaCreditCard,
  FaExclamationCircle,
} from "react-icons/fa";

const ShippingPolicy = () => {
  return (
    <div className="container my-5">
      <Helmet>
        <title>NexaHub|shipping Policy</title>
      </Helmet>

      <div className="heading-container">
        <h1 className="heading">Shipping Policy</h1>
      </div>

      <div className="section my-5">
        <div className="icon-container">
          <FaTruck className="icon" />
        </div>
        <div>
          <h2>Shipping Methods</h2>
          <p>
            We offer various shipping methods to cater to your delivery needs.
            The available options and estimated delivery times will be clearly
            presented during the checkout process.
          </p>
        </div>
      </div>

      <div className="section my-5">
        <div className="icon-container">
          <FaClock className="icon" />
        </div>
        <div>
          <h2>Processing Time</h2>
          <p>
            Orders are typically processed within  7 days business
            days. Please note that processing time may vary during peak seasons
            or promotions.
          </p>
        </div>
      </div>

      <div className="section my-5">
        <div className="icon-container">
          <FaCreditCard className="icon" />
        </div>
        <div>
          <h2>Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout based on the selected
            shipping method, delivery address, and the weight of the items in
            your order. Please review the total cost before confirming your
            purchase.
          </p>
        </div>
      </div>

      <div className="section my-5">
        <div className="icon-container">
          <FaExclamationCircle className="icon" />
        </div>
        <div>
          <h2>Shipping Delays</h2>
          <p>
            While we strive for timely deliveries, unforeseen circumstances or
            events beyond our control may cause shipping delays. We will
            promptly communicate any delays and provide support to address any
            issues that may arise.
          </p>
        </div>
      </div>

      <div className="contact-container">
        <h2>Need Assistance?</h2>
        <p>
          If you have any questions about our shipping policy or encounter any
          issues with your order, please do not hesitate to contact our customer
          service at  <FaEnvelope/>[mrnamdev1372000@gmail.com]. We are here to assist you.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
