import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { Helmet } from "react-helmet";


const AllCategoriesPAGE = () => {
  const categories = useCategory();
  return (
    <div className="container mt-3">
       <Helmet>
        <title>NexaHub|All categories</title>
      </Helmet>
      <div className="row">
        {categories.map((c) => (
          <h1 className=" bg-desire text-center hover-effect" key={c._id}>
            <Link to={`/category/${c.slug}`} className=" text-white  text-decoration-none">
              {c.name}
            </Link>
          </h1>
        ))}
      </div>
    </div>
  );
};

export default AllCategoriesPAGE;
