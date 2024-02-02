import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaStar } from "react-icons/fa";
import { BsCart } from 'react-icons/bs';
import MiniSpinner from "../../components/MiniSpinner";
import {useCart} from "../../context/cart";
import {useWish} from "../../context/wishlist";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet';

const OurStore = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const[cart,setCart] = useCart();
  const [wish, setWish] = useWish([]);
  const [sortBy, setSortBy] = useState("price");
  const [sortByPrice, setSortByPrice] = useState(""); 
  const [filterByCategory, setFilterByCategory] = useState("");
  const [sortByRating, setSortByRating] = useState(false); 

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/category/all-categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/all-products`);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setSortByPrice("");
  };

  const handleRatingCheckboxChange = () => {
    setSortByRating(!sortByRating);
  };

  const handleRefreshFilters = () => {
    setFilterByCategory("");
    setSortBy("price");
    setSortByPrice("");
    setSortByRating(false);
    getAllProducts();
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, []);

 
  const filteredProducts = filterByCategory
    ? products.filter((p) => p.category === filterByCategory)
    : products;

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "price") {
      if (sortByPrice === "lowToHigh") {
        return a.price - b.price;
      } else if (sortByPrice === "highToLow") {
        return b.price - a.price;
      }
      return 0;
    } else if (sortBy === "rating" && sortByRating) {
      return b.rating - a.rating;
    }
    return 0;
  });

  const totalProducts = sortedProducts.length;

  return (
    <>
     <Helmet>
        <title>NexaHub | Our Store</title>
      </Helmet>
      <h1 className="text-center mb-4">Our Store</h1>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3 bg-desire">
          <div>
            <label className="me-2 mb-1">Sort By :</label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>

            {sortBy === "price" && (
              <>
                <label className="ms-3 me-2">Sort By Price : </label>
                <select value={sortByPrice} onChange={(e) => setSortByPrice(e.target.value)}>
                  <option value="">Select the option</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </>
            )}

            {sortBy === "rating" && (
              <label className="ms-3">
                <input
                  type="checkbox"
                  checked={sortByRating}
                  onChange={handleRatingCheckboxChange}
                />
                Most Reviewed
              </label>
            )}
          </div>
          
          <div className="col-lg-4">
          <div className="d-flex justify-content-end align-items-center">
            <button className="btn text-white me-3" onClick={handleRefreshFilters}>
              Refresh Filters
            </button>
            <div className="p-3">Total Products: {totalProducts}</div>
          </div>
        </div>
        </div>

        {loading ? (
          <>
            <MiniSpinner /><p className="text-center">please wait...</p>
          </>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {sortedProducts.map((p) => (
              <div key={p._id} className="col mb-4">
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
                        <div className="mb-1">  &#8377;{p.price}</div>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-primary d-flex"
                          onClick={()=>{setCart([...cart,p]);
                            localStorage.setItem("cart",JSON.stringify([...cart,p]))
                            toast.success ("item Added to cart")
                            }}>
                            Add to Cart<BsCart color="white" size={20} />
                          </button>
                          <button className="btn" onClick={()=>{setWish([...wish,p]);
                            localStorage.setItem("wish",JSON.stringify([...wish,p]))
                            toast.success ("Added to Wishlist sucessfully")
                            }}>
                            <FaHeart size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OurStore;
