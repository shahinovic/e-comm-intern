import { Button, Card, Col } from "react-bootstrap";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import { Link } from "react-router-dom";

export const ShopCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isInCart = cart.items.find((item) => item.id === product.id);
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
  const truncateDescription = (description, wordsLength) => {
    const words = description.split(" ");
    if (words.length > wordsLength) {
      return words.slice(0, wordsLength).join(" ") + "...";
    }
    return description;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product));
  };

  return (
    <Col sm={12} md={6} xxl={4} key={product.id}>
      <Card>
        <Link
          style={{ all: "unset", cursor: "pointer" }}
          to={`/product/${product.id}`}
        >
          <Card.Img variant="top" src={product.images[0]} />
        </Link>
        <Card.Body>
          <Link
            style={{ all: "unset", cursor: "pointer" }}
            to={`/product/${product.id}`}
          >
            <Card.Title>{truncateDescription(product.title, 5)}</Card.Title>
            <RatingStars rating={product.rating.rate} />
            <Card.Text
              style={{ color: "#85bb65", fontSize: "18px", fontWeight: "bold" }}
            >
              {product.price}$
            </Card.Text>
            <Card.Text>
              {truncateDescription(product.description, 10)}
            </Card.Text>
          </Link>
          {isInCart ? (
            <Button variant="outline-danger" onClick={handleRemoveFromCart}>
              Remove From Cart
            </Button>
          ) : (
            <Button variant="outline-success" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};
