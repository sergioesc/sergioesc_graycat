import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Button, Col, Table } from "react-bootstrap";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Store } from "../../Store.js";
import { getError } from "../../utils.js";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [
    { loading, error, products, pages, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const params = useParams();
  const { seller: userName } = params;
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${userName}?page=${page}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        toast.error(getError(err));
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/products/${product._id}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success("product deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };
  if (userInfo.name === userName) {
    return (
      <div>
        {loadingDelete && <div>Cargando</div>}
        {loading ? (
          <div>Cargando</div>
        ) : error ? (
          <div>Ocurrio un error </div>
        ) : (
          <div>
            <Helmet>
              <title>GrayCat</title>
            </Helmet>
            <h1 className="text-center my-4 text-light">Productos</h1>
            <div className="bg-light my-4 mx-4">
              {loading ? (
                <div>Cargandoo </div>
              ) : error ? (
                <div>Ocurrió un error </div>
              ) : (
                <>
                  <Table className="">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>CATEGORÍA</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td> {product._id} </td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td>
                            &nbsp;
                            <Button
                              type="button"
                              variant="light"
                              onClick={() => deleteHandler(product)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="text-center">
                    {[...Array(pages).keys()].map((x) => (
                      <Link
                        className={
                          x + 1 === Number(page) ? "btn text-bold" : "btn"
                        }
                        key={x + 1}
                        to={`/admin/products?page=${x + 1}`}
                      >
                        {x + 1}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <Navigate to={`/mis-productos/${userInfo.name}`} />;
  }
}
