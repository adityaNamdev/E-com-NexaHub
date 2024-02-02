import React from "react";
import { Helmet } from 'react-helmet';
import { FaGlobe, FaClock, FaShieldAlt, FaHeadphones,FaCheckCircle, FaUsers, FaShoppingBag } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <>
     <Helmet>
        <title>NexaHub | About Us</title>
      </Helmet>
      <div className="container my-3">
        <h1 className="text-center"> <FaShoppingBag  style={{ marginRight: '0.5rem' }} />About Us - nexaHub</h1>
        <p>
          Welcome to nexaHub – Your Ultimate Shopping Destination! At
          nexaHub, we redefine your online shopping experience with a curated
          selection of products that cater to your diverse needs. As an
          innovative e-commerce platform, we take pride in offering a seamless
          journey from discovery to delivery.
        </p>
        <div className="container my-2 p-2 accordionMy">
          <div className="accordion accordion-flush " id="accordionFlushExample">
            <div className="accordion-item  ">
              <h2 className="accordion-header ">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <FaGlobe style={{ marginRight: '0.5rem' }} /> Explore a World of Choices:
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Dive into a virtual marketplace where endless possibilities
                  await. From cutting-edge electronics to fashion-forward
                  apparel, home essentials to lifestyle accessories, nexaHub
                  is your one-stop shop for all things fabulous and functional.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  <FaClock style={{ marginRight: '0.5rem' }}/>Unmatched Convenience:
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  We understand the value of your time, which is why we've
                  designed nexaHub to be user-friendly and efficient. Our
                  intuitive interface ensures that you can effortlessly navigate
                  through our extensive catalog, find what you need, and
                  complete your purchase with just a few clicks.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  <FaCheckCircle style={{ marginRight: '0.5rem' }} />  Quality Assurance:
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Quality is our priority. We collaborate with reputable sellers
                  and brands to bring you products that meet the highest
                  standards. Every item on nexaHub is carefully selected to
                  ensure that you receive not only what you want but also
                  top-notch quality.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                <FaShieldAlt style={{ marginRight: '0.5rem' }} />  Secure Shopping Environment:
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Your security is our utmost concern. Shop with confidence,
                  knowing that nexaHub employs state-of-the-art security
                  measures to safeguard your personal information and
                  transactions. Your privacy matters to us, and we go the extra
                  mile to ensure a secure online environment.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive"
                >
                  <FaHeadphones  style={{ marginRight: '0.5rem' }}/>  Exceptional Customer Service:
                </button>
              </h2>
              <div
                id="flush-collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Our commitment to customer satisfaction is unwavering. If you
                  have any inquiries, concerns, or need assistance, our
                  dedicated customer support team is just a message away. We are
                  here to make your nexaHub experience as smooth and enjoyable
                  as possible.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseSix"
                  aria-expanded="false"
                  aria-controls="flush-collapseSix"
                >
                  <FaUsers style={{ marginRight: '0.5rem' }} />Join the nexaHub Community:
                </button>
              </h2>
              <div
                id="flush-collapseSix"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Embark on a shopping journey like never before. Join our
                  growing community of satisfied customers who have discovered
                  the joy of shopping at nexaHub. Stay updated on the latest
                  trends, exclusive deals, and exciting promotions as we
                  continue to enhance your shopping experience.
                </div>
              </div>
            </div>

           
          </div>
         
        </div>

        <div>
              nexaHub – Where Convenience Meets Quality. Start shopping now!
            </div>
      </div>
    </>
  );
};

export default AboutUs;
