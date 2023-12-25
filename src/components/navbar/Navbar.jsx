import React, { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Offcanvas from "react-bootstrap/Offcanvas";

import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { GrContactInfo } from "react-icons/gr";

import "./Navbar.css";
import { Search } from "./Search";

function MyNavbar({ setOpenCart, openCart }) {
  const [searchActive, setSearchActive] = useState(false);
  const icon = useRef(null);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the clicked element is the other element, and close the popup if it's open

      if (
        searchActive &&
        event.target !== icon.current.children[0] &&
        event.target !== icon.current.children[1]
      ) {
        setSearchActive(false);
      }

      if (openCart && event.target.className === "shop-cart") {
        setOpenCart(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [searchActive]);

  const expand = "lg";

  return (
    <>
      <Navbar bg="light" expand={expand} fixed="top" className="bg-transparent">
        <Container fluid>
          <Link to="/" className="navbar-brand">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            className="d-flex justify-content-between"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                MyShop
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Link className="nav-link" to="/">
                  Home
                </Link>

                <div className="nav-link disabled">About</div>
                <div className="nav-link disabled">Contact</div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div
            className="d-flex align-items-center gap-3 position-absolute end-0 "
            style={{ marginRight: "90px" }}
          >
            <div
              ref={icon}
              className={`search ${searchActive ? "active" : ""}`}
              id="search-div"
            >
              <AiOutlineSearch
                onClick={() => {
                  setSearchActive(true);
                }}
              />

              <Search searchActive={searchActive} />
            </div>
            <div className="cart" onClick={() => setOpenCart(!openCart)}>
              <AiOutlineShoppingCart />
              <span className="products-count">{cart.items.length}</span>
            </div>
            {/* <div className="info">
              <GrContactInfo />
            </div> */}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
