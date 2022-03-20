import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import logger from "use-reducer-logger";
import Product from "../../components/Product.js";
import { Helmet } from "react-helmet-async";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function CategoryScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { category } = params;
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:5000/api/products/categories/${category}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [category]);
  return (
    <Container>
      <Helmet>
        <title>GrayCat</title>
      </Helmet>
      <h2 className="mt-4 text-center text-light">
        Deseas poner algo en venta?
      </h2>
      <p className="text-center text-light mb-4">
        Publica tu producto haciendo click{" "}
        <Link className="text-primary" to="/publicar">
          Aquí
        </Link>
      </p>
      <div className="products">
        {loading ? (
          <div> Cargando </div>
        ) : error ? (
          <div>Ocurrió un error </div>
        ) : (
          <Row className="d-flex w-100">
            {products.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}
