import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaStar } from "react-icons/fa";
const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/all-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container-fluid">
      <Helmet>
        <title>NexaHub | All Products</title>
      </Helmet>
      <div className="row">
        <main>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-3 bg-desire">
            <h1>All Products</h1>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>Total Products: {products.length}</div>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center ">
            {products?.map((p) => (  
              <Link
                key={p._id}
                to={`/admin-panel/all-products/${p.slug}`}
                className="product-link text-decoration-none text-black border col-lg-4 col-md-6 col-sm-6 mb-3"
              >
                <div className="product-card ">
                  <img
                    src={`/api/product/product-photo/${p._id}`}
                    className="card-img-top img-fluid"
                    alt="Product-image"
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className=" p-3 product-content p-card ">
                    <div className="rating badge text-bg-success">
                      {p.rating} <FaStar />
                    </div>
                    <div className="d-flex gap-1 align-items-baseline">
                      <div className="text-uppercase">{p.brand} :</div>
                      <h4 className="title ">
                        <div>{p.title}</div>
                      </h4>
                    </div>
                    <div className="">&#8377;{p.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllProducts;