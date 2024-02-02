import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaStar, FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeBottomFooter from "../../components/HomeBottomFooter";
import MiniSpinner from '../../components/MiniSpinner';


const CustomPrevArrow = (props) => {



  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev"
      onClick={onClick}
      style={{ fontSize: "30px", color: "black", zIndex: "999", position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
    >
      <FaChevronLeft />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-next"
      onClick={onClick}
      style={{ fontSize: "30px", color: "black", zIndex: "999", position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
    >
      <FaChevronRight />
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/product/all-products");
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

   
  const handleTopScrollClick = () => {
    window.scrollTo(0, 0);
  };
  


  return (
    <>
      <Helmet>
        <title>NexaHub | Home</title>
      </Helmet>

      <div id="carouselExampleRide" className="carousel slide " data-bs-ride="true">
  <div className="carousel-inner">
    <div onClick={() => navigate("/category/watches")} className="carousel-item active ">
      <img src="./assets/watchbanner-1.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div onClick={() => navigate("/category/tablets")} className="carousel-item">
      <img src="./assets/banner.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div  onClick={() => navigate("/category/head-phones")}className="carousel-item">
      <img src="./assets/gaming-headphone.jpg" className="d-block w-100 " alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>



      <div><h4 className="p-3 mt-3">Feautred Collection</h4>
      <div className="container">
      {loading && <MiniSpinner />}
        <Slider {...settings} className="product-slide p-2 ">
          {products.map((product) => (
            <div key={`${product._id}${product+1}`} className="col-md" onClick={handleTopScrollClick}>
              <Link
                to={`/product/${product.slug}`}
                className="text-decoration-none text-black"
                
              >
                <div className="card box-shadow m-4">
                  <img
                    src={`/api/product/product-photo/${product._id}`}
                    className="card-img-top"
                    style={{ objectFit: "cover" }}
                    alt="Product-image"
                  />
                  <div className="card-body">
                    <div className="rating badge text-bg-success">
                      {product.rating} <FaStar />
                    </div>
                    <div className="d-flex gap-1 align-items-baseline">
                      <div className="text-uppercase">{product.brand}:</div>
                      <h4 className="title">{product.title}</h4>
                    </div>
                    <div className="mb-1">&#8377;{product.price}</div>
                    
                    <div className="d-flex justify-content-between">
                      <p> {product.description.substring(0, 20)}...</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
         
    
         </div>

      <HomeBottomFooter className="mt-5"/>
    </>
  );
};

export default Home;
