import { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store.js";


export default function BarNav() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/iniciar";
  };


  return (
    <Navbar bg="transparent" variant="dark" expand="lg">
      <Container className="navbar">
        {userInfo ? (
          <Link to="/" className="link-white">
            GrayCat
          </Link>
        ) : (
          <Link to="/" className="link-white">
            GrayCat
          </Link>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 justify-content-end">
            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="basic-nav-dropdown"
                bg="black"
              >
                <LinkContainer to="/perfil">
                  <NavDropdown.Item>Perfil</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/historial">
                  <NavDropdown.Item>Historial</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/publicar">
                  <NavDropdown.Item>Publicar</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/mis-productos/${userInfo.name}`}>
                  <NavDropdown.Item>Mis Productos</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link className="dropdown-item" to="/" onClick={signoutHandler}>
                  Cerrar sesión
                </Link>
              </NavDropdown>
            ) : (
              <Link to="/iniciar" className="link-white">
                Iniciar Sesión
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Productos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Usuarios</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
