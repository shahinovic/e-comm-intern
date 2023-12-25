import React from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { IoIosRemoveCircle as Remove } from "react-icons/io";
import { IoBagCheckOutline, IoOpenOutline } from "react-icons/io5";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart).items;
  const dispatch = useDispatch();

  console.log(cart);

  const renderProducts = () => {
    return cart.map((ele) => {
      const handleRemoveFromCart = () => {
        dispatch(removeFromCart(ele));
      };
      const handleIncrementQuantity = () => {
        dispatch(incrementQuantity(ele));
      };
      const handleDecrementQuantity = () => {
        dispatch(decrementQuantity(ele));
      };
      return (
        <div className="cart-item">
          <div className="cart-item-image">
            <img src={ele.images[0]} alt="" />
          </div>
          <div className="cart-item-quantity">
            <div className="cart-item-quantity-actions">
              <div
                className="cart-item-quantity-minus"
                onClick={handleDecrementQuantity}
              >
                -
              </div>
              <div className="cart-item-quantity-number">{ele.quantity}</div>
              <div
                className="cart-item-quantity-plus"
                onClick={handleIncrementQuantity}
              >
                +
              </div>
            </div>
            <div className="cart-item-quantity-price">
              {ele.price * ele.quantity}$
            </div>
          </div>
          <div className="cart-item-actions">
            <Button onClick={handleRemoveFromCart} variant="outline-danger">
              <Remove />
            </Button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="shop-cart">
      <h4>Cart ({cart.length})</h4>
      <div className="products">{renderProducts()}</div>

      <div className="subtotal-checkout">
        <h3>
          Subtotal |{" "}
          {cart.reduce((acc, ele) => acc + ele.price * ele.quantity, 0)}$
        </h3>
        <Button variant="outline-success">
          <IoBagCheckOutline />
        </Button>
      </div>
    </div>
  );
};

export default Cart;
