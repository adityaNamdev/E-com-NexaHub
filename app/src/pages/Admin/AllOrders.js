import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { Helmet } from "react-helmet";


const { Option } = Select;

const AllOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/auth/all-orders");

      if (data.length > 0) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>NexaHub|Admin-All Orders</title>
      </Helmet>
      <div>
        <main>
          <div>
            <h1>All orders</h1>
          </div>

          <div>
            {orders.map((order) => (
              <div key={order._id} className="order-box  box-shadow">
                <div className="order-image">
                  {order?.products?.map((p) => (
                    <img
                      key={p._id}
                      src={`/api/product/product-photo/${p._id}`}
                      alt={p.title}
                      width="100" 
                    />
                  ))}
                </div>
                <div className="order-details">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Buyer:</strong> {order?.buyer?.name}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {moment(order?.createdAt).fromNow()}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {order?.payment.success ? "Success" : "Failed"}
                  </p>
                  <p>
                    <strong>Quantity:</strong>{" "}
                    {order?.products?.length}
                  </p>
                  <Select
                    onChange={(value) =>
                      handleChange(order._id, value)
                    }
                    defaultValue={order?.status}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllOrders;
