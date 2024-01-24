import React from "react";
import { FaShippingFast, FaGift, FaHeadset, FaMoneyBillAlt, FaLock } from "react-icons/fa";

const HomeBottomFooter = () => {
  return (
    <div className="HomeFooter d-flex flex-wrap align-items-center justify-content-center p-3">
      <div className="d-flex flex-column align-items-center m-3" style={{ maxWidth: "150px" }}>
        <FaShippingFast size={50} />
        <div className="text-center">
          <h6>Free Shipping</h6>
          <p>From all orders over ₹500</p>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center m-3" style={{ maxWidth: "150px" }}>
        <FaGift size={50} />
        <div className="text-center">
          <h6>Daily Surprise Offers</h6>
          <p>Save up to 25% off</p>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center m-3" style={{ maxWidth: "150px" }}>
        <FaHeadset size={50} />
        <div className="text-center">
          <h6>Support 24/7</h6>
          <p>Shop with an expert</p>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center m-3" style={{ maxWidth: "150px" }}>
        <FaMoneyBillAlt size={50} />
        <div className="text-center">
          <h6>Affordable Prices</h6>
          <p>Get Factory direct price</p>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center m-3" style={{ maxWidth: "150px" }}>
        <FaLock size={50} />
        <div className="text-center">
          <h6>Secure Payments</h6>
          <p>100% Protected Payments</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBottomFooter;
