import React from "react";
import "./ProductDetails.css";
import { useParams } from "react-router";
import { useGetProductsQuery } from "../../reduxServices/ProductsApi";
import { Link } from "react-router-dom";
import { HiArrowLeft as BackIcon } from "react-icons/hi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productId = Number(useParams().id);
  const products = useGetProductsQuery("products").data;
  const product = products?.products.find(
    (product) => product.id === productId
  );
  const cart = useSelector((state) => state.cart);
  const isInCart = cart.items.find((item) => item.id === product.id);
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product));
  };
  function RatingStars({ rating }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }
    if (halfStar) {
      stars.push(<BsStarHalf key={fullStars + 1} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={i + fullStars + 2} />);
    }

    return <div className="rating">{stars}</div>;
  }

  console.log(product);
  return (
    <div className="product-details">
      <div className="image">
        <img src={product?.images[0]} alt={product?.title} />
        <Link to="/">
          <BackIcon /> Back
        </Link>
      </div>
      <div className="info">
        <p className="category">{product?.category}</p>
        <h2 className="title">{product?.title}</h2>
        <p className="price">{product?.price}$</p>
        <p className="description text-muted">{product?.description}</p>
        <RatingStars rating={product?.rating.rate} />
        {isInCart ? (
          <Button
            className="action"
            variant="outline-danger"
            onClick={handleRemoveFromCart}
          >
            Remove From Cart
          </Button>
        ) : (
          <Button
            className="action"
            variant="outline-success"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
