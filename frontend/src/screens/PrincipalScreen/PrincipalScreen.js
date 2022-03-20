import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
export default function PrincipalScreen() {
  return (
    <div>
      <Helmet>
        <title>GrayCat</title>
      </Helmet>
      <Container className="my-5 p-0">
        <h2 className="text-light">Categoría más pupulares</h2>
        <Container className="p-0 category-container my-5 ">
          <Row className="flex-wrap">
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category/ropa">ROPA</Link>
            </Col>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category/Pants">Pants</Link>
            </Col>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category"> Categoria 3</Link>
            </Col>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category"> Categoria 4</Link>
            </Col>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category"> Categoria 5</Link>
            </Col>
          </Row>
          <Row>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category"> Categoria 6</Link>
            </Col>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category"> Categoria 7</Link>
            </Col>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category"> Categoria 8</Link>
            </Col>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category"> Categoria 9</Link>
            </Col>
            <Col className="p-4 text-center mx-2 my-4">
              <Link to="/category"> Categoria 10</Link>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
