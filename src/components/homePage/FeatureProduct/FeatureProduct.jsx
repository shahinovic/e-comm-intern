import React from "react";
import "./FeatureProduct.css";
import { Col, Container, Row } from "react-bootstrap";
import electronics from "../../../images/electronics.jpg";
import jewelery from "../../../images/jewelery.jpg";
import men from "../../../images/men-clothing.jpg";
import women from "../../../images/women-clothing.jpg";
import { Link } from "react-router-dom";

const FeatureProduct = ({ setHomeCategory }) => {
  return (
    <div className="feature-product py-5">
      <h1 className="text-center">All Categories</h1>
      <p className="text-center w-75 mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci enim
        nisi tempore libero, dolore, error iusto recusandae alias sint cum
        expedita a labore autem.
      </p>
      <div className="feature-product-container">
        <Container>
          <Row>
            <Col md={3}>
              <div className="card">
                <img src={electronics} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Electronics</h5>

                  <Link to="/shop">
                    <button
                      onClick={() => {
                        setHomeCategory("electronics");
                        window.scrollTo(0, 0);
                      }}
                      className="btn btn-outline-primary mt-2"
                    >
                      Show in Shop
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="card">
                <img src={jewelery} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Jewelery</h5>

                  <Link to="/shop">
                    <button
                      onClick={() => {
                        setHomeCategory("jewelery");
                        window.scrollTo(0, 0);
                      }}
                      className="btn btn-outline-primary mt-2"
                    >
                      Show in Shop
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="card">
                <img src={men} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Men's Closing</h5>

                  <Link to="/shop">
                    <button
                      onClick={() => {
                        setHomeCategory("men's clothing");
                        window.scrollTo(0, 0);
                      }}
                      className="btn btn-outline-primary mt-2"
                    >
                      Show in Shop
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="card">
                <img src={women} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Women's Closing</h5>

                  <Link to="/shop">
                    <button
                      onClick={() => {
                        setHomeCategory("women's clothing");
                        window.scrollTo(0, 0);
                      }}
                      className="btn btn-outline-primary mt-2"
                    >
                      Show in Shop
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FeatureProduct;
