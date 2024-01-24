import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../../context/cart";
import { useWish } from "../../context/wishlist";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet';

const ProductDetails = () => {
  const params = useParams();
  const [wish, setWish] = useWish([]);
  const [p, setP] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-product/${params.slug}`
      );
      setP(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-5  ">
        <Helmet>
          <title>NexaHub | Product details</title>
        </Helmet>
        <div className="row ">
          <div className="col-md-6">
            <img
              src={`/api/product/product-photo/${p._id}`}
              alt="Product"
              className="img-n"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6 ">
            <h2 className="mb-3 mt-2">{p.title}</h2>
            <p className="text-muted">Brand : {p.brand}</p>
            <div className="d-flex align-items-center mb-3">
              <div className="mr-2">
                <RatingStars rating={4.5} />
              </div>
              <span className="text-muted">({p.rating})</span>
            </div>
            <p>{p.description}</p>

            <div className="texxt-muted ">
              Category :
              <span className="text-bold h6"> {p?.category?.name}</span>
            </div>
            <p className="h3 text-primary">Price :&#8377;{p.price}</p>
            <button
              className="btn btn-primary mr-3"
              onClick={() => {
                setCart([...cart, p]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, p])
                );
                toast.success("Item added to cart");
              }}
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button
              className="btn btn-outline-secondary m-2"
              onClick={() => {
                setWish([...wish, p]);
                localStorage.setItem(
                  "wish",
                  JSON.stringify([...wish, p])
                );
                toast.success("Added to Wishlist successfully");
              }}
            >
              <FaHeart className="mr-2 " />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="row container">
        <h6>Similar Products</h6>
        <div className="similar-products-container mb-5 p-5">
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          {relatedProducts?.map((p) => (
            <div key={p._id} className="similar-product-card">
              <Link
                to={`/product/${p.slug}`}
                className="text-decoration-none text-black"
              >
                <div className="card box-shadow hover-effect">
                  <img
                    src={`/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt="Product-image"
                  />
                  <div className="card-body">
                    <div className="rating badge text-bg-success">
                      {p.rating} <FaStar />
                    </div>
                    <div className="d-flex gap-1 align-items-baseline">
                      <div className="text-uppercase">{p.brand}:</div>
                      <h4 className="title">{p.title}</h4>
                    </div>
                    <div className="mb-1"> &#8377;{p.price}</div>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary d-flex "
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("item Added to cart");
                        }}
                      >
                        Add to Cart
                        <BsCart color="white" size={20} />
                      </button>
                      <button
                        className="btn mb-2"
                        onClick={() => {
                          setWish([...wish, p]);
                          localStorage.setItem(
                            "wish",
                            JSON.stringify([...wish, p])
                          );
                          toast.success("Added to Wishlist successfully");
                        }}
                      >
                        <FaHeart size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} color={index + 1 <= rating ? "#ffc107" : "#e4e5e9"} />
  ));

  return <>{stars}</>;
};

export default ProductDetails;
