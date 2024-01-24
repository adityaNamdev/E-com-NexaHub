import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CategoryForm from "../../components/CategoryForm";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Modal } from "antd";



const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    const clearForm = () => {
        setName("");
      };
  
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "/api/category/create-category",
          {
            name,
          }
        );
        if (data?.success) {
          toast.success(`${name} is created`);
          getAllCategory();
          clearForm();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("somthing went wrong in input form");
      }
     
    };
  
    //get all cat
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(
          "/api/category/all-categories"
        );
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting catgeory");
      }
    };
  
    useEffect(() => {
      getAllCategory();
    }, []);
  

    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `/api/category/update-category/${selected._id}`,
          { name: updatedName }
        );
        if (data.success) {
          toast.success(`${updatedName} is updated`);
          setSelected(null);
          setUpdatedName("");
          setVisible(false);
          getAllCategory();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Somtihing went wrong");
      }
    };
    //delete category
    const handleDelete = async (pId) => {
      try {
        const { data } = await axios.delete(
          `/api/category/delete-category/${pId}`
        );
        if (data.success) {
          toast.success(`category is deleted`);
  
          getAllCategory();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Somthing went wrong");
      }


  };
  return (
    <>
      <div className="container-fluid">
        <Helmet>
          <title>NexaHub|Admin-CreateCategory</title>
        </Helmet>
        <div className="row">
          <main>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-3 bg-desire">
              <h1>CreateCategory</h1>
            </div>
            <div className="container m-3 p-3">
      <div className="row">
        <div className="col-md-9">
          <h1>Manage Category</h1>
          <div className="p-3 w-100">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-100">
            {categories.length === 0 ? (
              <h3 className="text-center">No categories available</h3>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit <AiFillEdit />
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                         Delete <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          ><div className="container mt-2">
            <h3 className="mb-3">Edit Category</h3>
             <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </div>
           
          </Modal>
        </div>
      </div>
    </div>
            </main>
            </div>
            </div>
  
  
    </>
  );
};

export default CreateCategory;
