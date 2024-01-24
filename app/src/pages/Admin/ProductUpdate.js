import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MiniSpinner from "../../components/MiniSpinner";
const { Option } = Select;


const ProductUpdate = () => {

    const navigate = useNavigate();
    const params = useParams();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);


  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get( `/api/product/get-product/${params.slug}`
      );
      setTitle(data.product.title);
      setBrand(data.product.brand);
      setRating(data.product.rating); 
      setDescription(data.product.description);
      setPrice(data.product.price);
      setStock(data.product.stock);
      setShipping(data.product.shipping ? "1" : "0");
      setCategory(data.product.category._id);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  
  }, []);

  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/category/all-categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      window.scrollTo(0, 0);
      setLoading(true);
      const productData = new FormData();
      productData.append("title", title);
      productData.append("brand", brand);
      productData.append("rating", rating );
      productData.append("shipping", shipping);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("stock", stock);
      productData.append("category", category);
      photo && productData.append("photo", photo);


      const response = await axios.put(
        `/api/product/update-product/${id}`,
        productData
      );
  
      if (response.data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/admin-panel/all-products");
      } else {
        toast.error(response.data?.message || "Update failed");
      }
    } catch (error) {
      console.error("Error during product update:", error);
      toast.error("Something went wrong");
    }finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    try {
      window.scrollTo(0, 0);
      setLoading(true);
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/admin-panel/all-products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }finally {
      setLoading(false);
    }
  };



  return (
    <div className="container-fluid">
      <Helmet>
        <title>NexaHub| Update Product</title>
      </Helmet>
      <div className="row">
        <main>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-3 bg-desire">
            <h1>Update Product</h1>
           
          </div>
          {loading && <MiniSpinner />}
          <div className=" p-4" >  
         <div className="mb-3"> <Select
          variant={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"  
              onChange={(value) => {setCategory(value)}}
              value={category}
              
            >
              {categories?.map((p) => (
                <Option key={p._id} value={p._id}>
                  {p.name}
                </Option>
              ))}
            </Select></div>
           
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
            {photo ? (
                <div className="text-center">
                  <img
                     src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`/api/product/product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={title}
                placeholder="Write a title"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={brand}
                placeholder="Write a brand"
                className="form-control"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={rating}
                placeholder="Write a Rating"
                className="form-control"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="Write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={stock}
                placeholder="Write a quantity"
                className="form-control"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                variant={false}
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setShipping(value)}
                value={shipping? "yes":"No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary btn-lg btn-block" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger btn-lg btn-block" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProductUpdate
