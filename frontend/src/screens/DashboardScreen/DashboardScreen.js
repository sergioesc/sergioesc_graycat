import React from "react";
import { Helmet } from "react-helmet-async";
import { Row, Col, Card } from "react-bootstrap";
import { useReducer } from "react";
import { useContext } from "react";
import { Store } from "../../Store.js";
import { useEffect } from "react";
import axios from "axios";
import { getError } from "../../utils.js";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/summary",
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {loading ? (
        <div>Cargando </div>
      ) : error ? (
        <div> Ocurrió un error </div>
      ) : (
        <Row>
          <Col md={12}>
            <Card>
              <h1 className="text-center my-3">Dashboard</h1>
              <Card.Body>
                <div className="d-flex">
                  <Card.Text className="mx-5">
                    {" "}
                    Usuarios registrados:{" "}
                  </Card.Text>
                  <Card.Text>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Text>
                </div>
                <div className="d-flex">
                  <Card.Text className="mx-5">
                    Productos registrados:
                  </Card.Text>
                  <Card.Text>
                    {summary.products && summary.products[0]
                      ? summary.products[0].numProducts
                      : 0}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      )}
    </div>
  );
}
