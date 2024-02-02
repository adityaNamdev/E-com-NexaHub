import React, { useState, useEffect } from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AiFillDelete } from "react-icons/ai";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const initializedCart = storedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));

      setCart(initializedCart);
    };

    initializeCart();
  }, [setCart]);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (productId) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);



  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <title>NexaHub | Cart</title>
      </Helmet>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bglight box-shadow p-2 mb-4">
            {!auth?.user
              ? "Hello Guest"
              : `Heyy!! ${auth?.token && auth?.user?.name}`}
          </h1>
          <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cart?.map((p, index) => (
            <div className="card mb-3 box-shadow" key={`${p._id}_${index}`}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`/api/product/product-photo/${p._id}`}
                    className="card-img-top img-fluid"
                    alt={p.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="rating badge text-bg-success mb-2">
                      {p.rating} <FaStar />
                    </div>
                    <p className="text-uppercase">Brand: {p.brand}</p>
                    <p>{p.title}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: &#8377;{p.price}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => removeCartItem(p._id)}
                >
                  <AiFillDelete /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-body">
              <h2 className="card-title text-center">Cart Summary</h2>
            
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => navigate("/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-sucess"
                      onClick={() => navigate("/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-sucess"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                     <p className="text-primary"> Hey!!please Login to checkout</p> 
                    </button>
                    
                  )}
                  
                </div>
              )}
              <div className="mt-2">
                {!clientToken  || !auth?.token || !cart?.length ? (
                  ""
                ) : ( 
                  <>
                    <div className="text-red p-3">
                      Sorry!! For inconvenience, but at that time only card payment will be accepted
                    </div>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary mt-4"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
