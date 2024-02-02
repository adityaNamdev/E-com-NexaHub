import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";
import MiniSpinner from '../../components/MiniSpinner';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div className="container-fluid ">
       <Helmet>
        <title>NexaHub | MyOrders</title>
      </Helmet>
      <div className="row justify-content-center">
      {loading && <MiniSpinner />}
        <div className="col-md-9">
          <h1 className="text-center mb-4">Order History</h1>
          {orders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div className="card mb-4" key={order._id}>
                <div className="card-header">
                  <h5 className="mb-0">
                    Order #{index + 1} - {moment(order.createAt).format("MMMM D, YYYY")}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Brand</th>
                          <th scope="col">Model</th>
                          <th scope="col">Rating</th>
                          <th scope="col">Description</th>
                          <th scope="col">Price</th>
        
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((product) => (
                          <tr key={product._id}>
                            <td>
                              <img
                                src={`/api/product/product-photo/${product._id}`}
                                alt={product.title}
                                className="img-thumbnail"
                                style={{ maxWidth: "100px", maxHeight: "100px" }}
                              />
                            </td>
                            <td>{product.brand}</td>
                            <td>{product.title}</td>
                            <td>
                              <div className="rating badge text-bg-success">
                                {product.rating} <FaStar />
                              </div>
                            </td>
                            <td>{product.description.substring(0,25)}...</td>
                            <td>&#8377;{product.price}</td>
                            
                          </tr>
                          
                        ))}
                      </tbody>
                    </table>

                  </div>
                  <div className="text-center">
                  <p className="mb-0">Deliverd Status: {order.status}</p>
                    <p className="mb-0">Payment Status: {order.payment.success ? "Success" : "Failed"}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
