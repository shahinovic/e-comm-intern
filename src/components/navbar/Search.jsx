import React, { useState } from "react";
import { useGetProductsQuery } from "../../reduxServices/ProductsApi";
import { Link } from "react-router-dom";

export const Search = ({ searchActive }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const products = useGetProductsQuery("products").data;
  console.log("🚀 ~ file: Search.jsx:8 ~ Search ~ products:", products);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products?.products.filter((product) => {
    if (searchQuery !== "") {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });
  // return <div>search</div>;

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        // placeholder="Search for a product"
      />
      <ul
        style={{
          display: searchActive ? "block" : "none",
          padding: filteredProducts?.length > 0 ? "7px" : "0",
        }}
      >
        {filteredProducts?.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            onClick={() => setSearchQuery("")}
          >
            <li>
              <img src={product.image} alt="" />
              <span>{product.title}</span>
              <span>${product.price}</span>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};
