import React, { useEffect, useReducer, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import axios from "axios";
import { Store } from "../../Store.js";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductScreen() {
  const params = useParams();
  const { id: productId } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:5000/api/products/product/${productId}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [productId]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  return loading ? (
    <div>Cargandooo</div>
  ) : error ? (
    <div> Errooooor</div>
  ) : (
    <div>
      <Row className="d-flex w-100">
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={6} className="card-product-unique">
          <Col md={12}>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Helmet>
                    <title> {product.name} </title>
                  </Helmet>
                  <h1> {product.name} </h1>
                </ListGroup.Item>
                <ListGroup.Item>Precio: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Descripcion:
                  <p> {product.description} </p>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Col>
          <Col md={12}>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col> Precio total: </Col>
                    <Col> ${product.price} </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Estado: </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">En Stock</Badge>
                      ) : (
                        <Badge bg="danger">No disponible</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Publicado por: </Col>
                    <Col>
                      <Link
                        className="text-dark"
                        to={`/perfil/${product.seller}`}
                      >
                        {product.seller}
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grip">
                      <Button variant="primary" className="d-flex mx-auto">
                        Agregar al carro
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
