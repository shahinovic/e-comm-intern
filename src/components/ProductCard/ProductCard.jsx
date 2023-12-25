import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import "./ProductCard.css";
// import img1 from "../../images/img-1.png";
// import img2 from "../../images/img-3.png";
// import img3 from "../../images/img-2.png";

function ProductCard({ product, index }) {
  const images = [img1, img2, img3];
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isInCart = cart.items.find((item) => item.id === product.id);
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="product-card" id={`product-${index + 1}`}>
      <div className="img">
        <img
          src={images[index]}
          alt={product.name}
          width="100%"
          height="100%"
        />
      </div>
      <div className="info">
        <h3 className="text-black-50 h1 fw-lighter  text-uppercase">
          {product.name}
        </h3>
        <p className="desc fw-lighter">{product.description}</p>
        <p className="price">{product.price}$</p>
        {isInCart ? (
          <button
            className="remove-from-cart btn btn-outline-danger"
            onClick={handleRemoveFromCart}
          >
            REMOVE FROM CART
          </button>
        ) : (
          <button
            className="add-to-cart btn btn-outline-success"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
