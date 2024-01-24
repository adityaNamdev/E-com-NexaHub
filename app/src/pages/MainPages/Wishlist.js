import React, { useState, useEffect } from "react";
import { useWish } from "../../context/wishlist";
import { useAuth } from "../../context/auth";
import {useCart} from "../../context/cart";
import { useNavigate , Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsCart } from 'react-icons/bs';
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet';


const Wishlist = () => {
  const [auth] = useAuth();
  const [wish, setWish] = useWish();
  const[cart,setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeWish = () => {
      const storedWish = JSON.parse(localStorage.getItem("wish")) || [];
      const initializedWish = storedWish.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));

      setWish(initializedWish);
    };

    initializeWish();
  }, [setWish]);

  const removeWishItem = (productId) => {
    try {
      const updatedWish = wish.filter((item) => item._id !== productId);
      setWish(updatedWish);
      localStorage.setItem("wish", JSON.stringify(updatedWish));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
 <Helmet>
        <title>NexaHub |Wishlist</title>
      </Helmet>
    
      <h1 className="text-center bg-light p-2 mb-1">
        {!auth?.user
          ? "Hello Guest"
          : `Hello ${auth?.token && auth?.user?.name}`}
        <p className="text-center">
          {wish?.length
            ? `You Have ${wish.length} items in your Wishlist ${
                auth?.token ? "" : "please login to checkout !"
              }`
            : " Your Wishlist Is Empty"}
        </p>
      </h1>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {wish?.map((p,index) => (
            <div className="col mb-4" key={`${p._id}_${index}`}>
              
                <Link
                  to={`/product/${p.slug}`}
                  className="text-decoration-none text-black"
                >
                  <div className="card box-shadow hover-effect">
                    <img
                      src={`/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
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
                          className="btn btn-primary d-flex"
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
                          className="btn btn-danger mt-2"
                          onClick={() => {removeWishItem(p._id);
                        toast.success("item Removed sucessfully ")}}
                        >
                          Remove 
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

export default Wishlist;
