import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const handleTopScrollClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="footer">
      <div className="container">
        <footer className="py-5">
          <div className="row d-flex justify-content-between">
            <div className="col-md-2 mb-3 text-white">
              <h5>Information</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to="/privacy-policy" onClick={handleTopScrollClick} className="nav-link p-0 text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/refund-policy" onClick={handleTopScrollClick} className="nav-link p-0 text-white">
                    Refund Policy
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/shipping-policy" onClick={handleTopScrollClick} className="nav-link p-0 text-white">
                    Shipping Policy
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/termsOfService" onClick={handleTopScrollClick} className="nav-link p-0 text-white">
                    Terms Of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-2 mb-3">
              <h5>Account</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <div  className="nav-link p-0 text-white"onClick={handleTopScrollClick} >
                    Search
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/about-us" onClick={handleTopScrollClick} className="nav-link p-0 text-white">
                    About Us
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/contact-us" onClick={handleTopScrollClick} className="nav-link p-0 text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-2 mb-3">
              <h5>Quick Links</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"onClick={handleTopScrollClick}>
                  <Link to="/category/watches"  className="nav-link p-0 text-white">
                    Watches
                  </Link>
                </li>
                <li className="nav-item mb-2"onClick={handleTopScrollClick} >
                  <Link to="/category/tablets" className="nav-link p-0 text-white">
                  Tablets
                  </Link>
                </li>
                <li className="nav-item mb-2"onClick={handleTopScrollClick}>
                  <Link to="/category/speakers"  className="nav-link p-0 text-white">
                  Speakers
                  </Link>
                </li>
                <li className="nav-item mb-2" onClick={handleTopScrollClick}>
                  <Link to="/category/head-phones"  className="nav-link p-0 text-white">
                 Head Phones
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-3 my-3 border-top text-center">
            <p>&copy;{new Date().getFullYear()}, NexaHub.com, Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
