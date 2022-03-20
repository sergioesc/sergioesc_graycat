import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils.js";
import { useContext } from "react";
import { Store } from "../../Store.js";
import { useEffect } from "react";
export default function LoginScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signin",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");

    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo){
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    <Container className="small-container mt-5">
      <Helmet>
        <title>GrayCat</title>
      </Helmet>
      <Form className="bg-white my-3 d-flex form-bg-white" onSubmit={handleSubmit}>
        <Col sm={4} md={6}>
          <img
            src="https://picsum.photos/700/700/?blur=1"
            alt="img"
            className="imagen"
          />
        </Col>
        <Col xs={12} sm={8} md={6} className="p-4">
          <h2 className="display-6 text-center my-4"> Ingresar a GrayCat</h2>
          <Form.Group className="my-4 mx-2" controlId="email">
            <Form.Label>Correo Electronico </Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electronico"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-4 mx-2" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              palceholder="Contraseña"
            />
          </Form.Group>
          <Form.Group className="my-3 " controlId="">
            <p className="text-end mx-3 text-muted ">
              No tienes una cuenta? <Link to="/registrarse">Registrarse </Link>
            </p>
            <Button
              variant="primary"
              type="submit"
              className="mt-4 w-75 items-center mx-5"
            >
              Iniciar Sesión
            </Button>
          </Form.Group>
        </Col>
      </Form>
    </Container>
  );
}
