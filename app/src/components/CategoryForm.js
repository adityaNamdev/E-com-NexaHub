import React from "react";
import { BsPlusCircle } from "react-icons/bs";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-3 mt-2">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn btn-primary d-flex align-items-center justify-content-center gap-2">
          
          Add <BsPlusCircle className="me-2" />
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
