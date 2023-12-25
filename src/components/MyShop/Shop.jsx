import React, { useEffect, useRef } from "react";

import { useGetProductsQuery } from "../../reduxServices/ProductsApi";
import "./Shop.css";
import { Container, Form, Row } from "react-bootstrap";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import { ShopCard } from "./ShopCard";

const Shop = ({ homeCategory }) => {
  const products = useGetProductsQuery("products").data;
  const categories = useGetProductsQuery("products/categories").data;
  const [liActive, setLiActive] = useState(false);
  const [filters, setFilters] = useState({
    category: homeCategory,
    priceRange: {
      min: 0,
      max: 10000,
    },
    rating: 0,
  });

  const handleClick = (index) => {
    index === liActive ? setLiActive(-1) : setLiActive(index);
  };

  const filteredProducts = products?.products.filter((product) => {
    // if (filters.category === "all") {
    //   return true;
    // }

    return (
      (filters.category === "all" || product.category === filters.category) &&
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max &&
      product.rating >= filters.rating
    );
  });
  const renderProducts = () => {
    return filteredProducts?.map((product) => {
      if (filters.category === "all") {
        return <ShopCard product={product} key={product.id} />;
      }
      return (
        product.category === filters.category && (
          <ShopCard product={product} key={product.id} />
        )
      );
    });
  };
  const handlePriceChange = (event) => {
    const newFilters = { ...filters };
    newFilters.priceRange = { ...filters.priceRange };
    newFilters.priceRange[event.target.name] = Number(event.target.value);
    setFilters(newFilters);
  };

  const handleRatingChange = (event) => {
    const newFilters = { ...filters };
    newFilters.rating = Number(event.target.value);
    setFilters(newFilters);
  };
  return (
    <div className="shop">
      <Container>
        <div className="filters py-3">
          <h2>Categories </h2>
          <ul>
            <li className={`rating ${liActive === 1 ? "active" : ""}`}>
              <h4 onClick={() => handleClick(1)}>
                Price {liActive === 1 ? <FaAngleDown /> : <FaAngleRight />}
              </h4>
              <Form.Control
                type="number"
                placeholder="From price"
                aria-label="from-price"
                aria-describedby="basic-addon1"
                name="min"
                value={filters.priceRange.min}
                onChange={handlePriceChange}
              />
              <Form.Control
                type="number"
                placeholder="To price"
                aria-label="to-price"
                aria-describedby="basic-addon1"
                name="max"
                value={filters.priceRange.max}
                onChange={handlePriceChange}
              />
            </li>
          </ul>
        </div>
        <div className="products py-3">
          <ul>
            <li
              className={`all ${filters.category === "all" ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, category: "all" })}
            >
              All
            </li>
            {categories?.map((category) => (
              <li
                onClick={() => setFilters({ ...filters, category })}
                className={`${category} ${
                  filters.category === category ? "active" : ""
                }`}
                key={category}
              >
                {category}
              </li>
            ))}
          </ul>
          <Row>{renderProducts()}</Row>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
