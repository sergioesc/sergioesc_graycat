import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Col } from "react-bootstrap";
import axios from "axios";

import { Helmet } from "react-helmet-async";
import { Store } from "../../Store.js";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getError } from "../../utils.js";
export default function RegisterScreen() {
  const navigate = useNavigate();
  const { search } = useLocation;
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    } else if (!password || !confirmPassword || !password & !confirmPassword) {
      toast.error("Por favor complete todos los campos");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          name,
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container className="medium-container">
      <Helmet>
        <title>Registro</title>
      </Helmet>

      <Form className="bg-white my-3 d-flex form-bg-white" onSubmit={handleSubmit}>
        <Col sm={4} md={6}>
          <img
            src="https://picsum.photos/700/700/?blur=1"
            alt="img"
            className="imagen"
          />
        </Col>
        <Col xs={12} sm={8} md={6} className="py-4">
          <h2 className="display-7 text-center my-3">Registrate en GRAYCAT</h2>
          <Form.Group className="m-3 mt-4" controlId="name">
            <Form.Label className="col-sm">Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="m-3" controlId="email">
            <Form.Label>Correo Electronico </Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electronico"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              No compartiremos tu correo con nadie.
            </Form.Text>
          </Form.Group>
          <Form.Group className="m-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </Form.Group>
          <Form.Group className="m-3" controlId="confirmPassword">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
            />
          </Form.Group>
          <Form.Group className="mb-3 m-auto" controlId="">
            <p className="text-end mx-3 text-muted ">
              Ya tienes una cuenta? <Link to="/iniciar">Iniciar Sesión</Link>
            </p>
            <Button
              variant="primary"
              type="submit"
              className="mt-4 w-75 items-center mx-5"
            >
              Registrarse
            </Button>
          </Form.Group>
        </Col>
      </Form>
    </Container>
  );
}
