import React from "react";
import { Helmet } from 'react-helmet';
import {
  FaRegMoneyBillAlt,
  FaRegCreditCard,
  FaShippingFast,
  FaExclamationCircle,
} from "react-icons/fa";

const RefundPolicy = () => {
  return (
    <div className="container-refund my-5">
      <Helmet>
          <title>NexaHub|Refund Policy</title>
        </Helmet>
      <div className="heading-container">
        <h1 className="heading">Our Refund Policy</h1>
      </div>
      <div className="container">
        
        <div className="section my-5">
          <div className="icon-container">
            <FaRegMoneyBillAlt className="icon" />
          </div>
          <div>
            <h2>Full Refund</h2>
            <p>
              We offer a full refund for items returned within 7 days of
              purchase. To be eligible, the item must be unused and in the same
              condition as received.
            </p>
          </div>
        </div>

        <div className="section my-5">
          <div className="icon-container">
            <FaRegCreditCard className="icon" />
          </div>
          <div>
            <h2>Credit Card Refunds</h2>
            <p>
              Once your return is received and inspected, we will process the
              refund to your original credit card within 7 days.
            </p>
          </div>
        </div>

        <div className="section my-5">
          <div className="icon-container">
            <FaRegMoneyBillAlt className="icon" />
          </div>
          <div>
            <h2>Partial Refund</h2>
            <p>
              In certain cases, a partial refund may be granted for items with
              obvious signs of use or any item not in its original condition.
            </p>
          </div>
        </div>

        <div className="section my-5">
          <div className="icon-container">
            <FaShippingFast className="icon" />
          </div>
          <div>
            <h2>Return Shipping</h2>
            <p>
              Customers are responsible for return shipping costs unless the
              return is due to an error on our part or a defective item.
            </p>
          </div>
        </div>

        <div className="section my-5">
          <div className="icon-container">
            <FaExclamationCircle className="icon" />
          </div>
          <div>
            <h2>Non-Refundable Items</h2>
            <p>
              Certain items are non-refundable, including [list of
              non-refundable items].
            </p>
          </div>
        </div>
      </div>

      <div className="contact-container">
        <h2>Need Assistance?</h2>
        <p>
          If you have any questions about our refund policy, feel free to
          contact our customer service at [mrnamdev1372000@gmail.com].
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
