import React, { useState, useEffect } from "react";
import { useParams, useNavigate , Link} from "react-router-dom";
import axios from "axios";
import { FaHeart, FaStar } from "react-icons/fa";
import { BsCart } from 'react-icons/bs';
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import MiniSpinner from "../../components/MiniSpinner";
import { Helmet } from 'react-helmet';
import {useWish} from "../../context/wishlist";


const SingleCategoryPage = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [wish, setWish] = useWish([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    } finally {
    setLoading(false);
  }
  };

  return (
    <>
       <Helmet>
        <title >{`NexaHub | ${category?.name}`}</title>
      </Helmet>
    <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>

   <div className="container">
       

        {loading ? (
          <>
            <MiniSpinner /><p className="text-center">please wait...</p>
          </>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {products?.map((p) => (
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
                          window.scrollTo(0, 0);
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
  )
}

export default SingleCategoryPage
