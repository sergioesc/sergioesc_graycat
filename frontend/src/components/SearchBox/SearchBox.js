import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    console.log(search);
  };
  return (
    <Container className="medium-container mt-5 search-box d-flex m-auto w-75 p-0">
      <Col className="pt-5 search-box-container" xs={12}>
        <Row>
          <h2 className="text-center">Encuentra lo que buscas en GrayCat</h2>
        </Row>
        <Row>
          <Form className="w-75 mx-auto d-flex my-4" onSubmit={searchHandler}>
            <Col xs={10}>
              <Form.Control
                type="search"
                placeholder="Buscar"
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </Col>
            <Col xs={2}>
              <Button type="submit" variant="outline-light mx-2">
                Buscar
              </Button>
            </Col>
          </Form>
        </Row>
      </Col>
    </Container>
  );
}
