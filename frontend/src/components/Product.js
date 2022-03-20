import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store.js";

export default function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
  };

  return (
    <Card  className="card-category">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body className="">
        <Link to={`/product/${product._id}`}>
          <Card.Title> {product.name} </Card.Title>
        </Link>
        <Card.Text className="text-light"> ${product.price} </Card.Text>
        {product.countInStock === 0 ? (
          <Button className="d-flex mx-auto" variant="light" disabled>
            No hay en stock
          </Button>
        ) : (
          <Button className="d-flex mx-auto" onClick={() => addToCartHandler(product)}>
            Agregar al carro
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
