import React from "react";
import { useSearch } from "../../context/search";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet';

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <>
       <Helmet>
        <title>NexaHub |Search Products</title>
      </Helmet>
      <h1 className="text-center mb-4">Search Products</h1>
      <div className="container">
        <h6 className="text-center">
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </h6>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {values?.results.map((p) => (
            <div key={p._id} className="col mb-4">
              <Link
                to={`/api/product/product-photo/${p._id}`}
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
                      <div className="">{p.brand}:</div>
                      <h4 className="title">{p.title}</h4>
                    </div>
                    <div className="mb-1"> &#8377;{p.price}</div>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-primary d-flex"
                       onClick={()=>{setCart([...cart,p]);
                        localStorage.setItem("cart",JSON.stringify([...cart,p]))
                        toast.success ("item Added to cart");
                        }}>
                        Add to Cart
                        <BsCart color="white" size={20} />
                      </button>
                      <button className="btn">
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

export default Search;
