import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import axios from "axios";
import { Store } from "../Store";
const Product = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  const handleAddToCart = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quntity = existItem ? existItem.quntity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quntity) {
      alert("Sorry. Product is out of stock");
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quntity } });
  };
  return (
    <Card key={product.name} className="container__div">
      <Link to={`/product/${product.slug}`} className="container__a">
        <img
          className="container__img"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`} className="container__a">
          <Card.Title className="container__p">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text className="container__p">
          <strong>${product.price}</strong>
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button disabled>Out of stock</Button>
        ) : (
          <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
        )}
      </Card.Body>
      {/* <div className="container__info">
        <button className="container__button">Add to cart</button>
      </div> */}
    </Card>
  );
};

export default Product;
