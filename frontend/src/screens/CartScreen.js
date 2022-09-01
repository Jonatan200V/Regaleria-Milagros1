import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import icon from "../iconos/icono";
import Card from "react-bootstrap/Card";

import "./CartScreen.css";
import axios from "axios";

const CartScreen = () => {
  const { state, dispatch: ctxDipatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();
  const handleUpdate = async (item, quntity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quntity) {
      alert("Sorry. Product is out of stock");
    }
    ctxDipatch({ type: "CART_ADD_ITEM", payload: { ...item, quntity } });
  };
  const handleRemove = (item) => {
    ctxDipatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const handleCheckout = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    // <div>
    <Row>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Col md={8} className="cartscreen">
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <div className="cartscreen__container" key={item.slug}>
                <img
                  src={item.image}
                  className="cartscreen__img"
                  alt={item.slug}
                />
                <Link to={`product/${item.slug}`} className="cartscreen__link">
                  {item.name}
                </Link>
                <button
                  className="cartscreen__button"
                  onClick={() => handleUpdate(item, item.quntity + 1)}
                >
                  <span>+</span>
                </button>
                <span className="cartscreen__quntity">{item.quntity}</span>
                <button
                  className="cartscreen__button"
                  onClick={() => handleUpdate(item, item.quntity - 1)}
                >
                  <span>-</span>
                </button>
                <button
                  className="cartscreen__trash"
                  onClick={() => handleRemove(item)}
                >
                  {icon.tras}
                </button>
                <span className="cartscreen__price">${item.price}</span>
              </div>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <h3>
                  Cantidad {cartItems.reduce((a, b) => a + b.quntity, 0)}
                  {""} : $
                  {cartItems.reduce((a, b) => a + b.price * b.quntity, 0)}
                </h3>
                <button className="button__checkout" onClick={handleCheckout}>
                  Proceed Checkout
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    // </div>
  );
};

export default CartScreen;
