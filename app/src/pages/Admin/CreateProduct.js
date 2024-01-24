import React, { useState, useEffect } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineFileImage } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import MiniSpinner from "../../components/MiniSpinner";
const { Option } = Select;


const CreateProduct = () => {

  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);



  const getAllCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/api/category/all-categories"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);


  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("title", title);
      productData.append("brand", brand);
      productData.append("rating", rating);
      productData.append("shipping", shipping);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("stock", stock);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        "/api/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");

        navigate("/admin-panel/all-products");
      } else {
        toast.error(data?.message || "Product creation failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container-fluid">
        <Helmet>
        <title>NexaHub|Admin-CreateProduct</title>
      </Helmet>
    <div className="row">
    

   <main >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-3 bg-desire ">
          <h1 >Create Product</h1>
        </div>
        {loading && <MiniSpinner />}
        <div className=" p-4" >  
         <div className="mb-3"> <Select
          variant={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select></div>
           
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}< AiOutlineFileImage/>
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
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
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
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
              CREATE PRODUCT <BsPlusCircle className="ms-2" />
              </button>
            </div>
          </div>
      </main>
    </div>
  </div>
  </>
  )
}

export default CreateProduct
