import axios from "axios";
import React from "react";
import { useState } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Store } from "../../Store.js";
import { getError } from "../../utils.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload.products };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return { ...state, loadingUpload: false, errorUpload: "" };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function CreateProducts() {
  const [{ loading, error, products, loadingCreate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState(userInfo.name);
  const createHandler = async (e) => {
    e.preventDefault();
    if (window.confirm("Confirmar producto")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "http://localhost:5000/api/products",
          {
            name,
            slug,
            price,
            image,
            category,
            countInStock,
            description,
            brand,
            seller,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success("producto creado correctamente");
        dispatch({
          type: "CREATE_FAIL",
        });
      } catch (err) {
        toast.error(getError(err));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: "UPLOAD_SUCCESS" });
      toast.success("Imagen cargada correctamente");

      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  return (
    <div>
      <Container className="medium-container">
        <Helmet>
          <title>GrayCat</title>
        </Helmet>
        <Form
          className="bg-white my-3 form-bg-white w-100 py-3"
          onSubmit={createHandler}
        >
          <h2 className="text-center mt-3 mb-5">Publicar producto</h2>
          <Form.Group className="d-flex mx-auto px-5" controlId="name">
            <Form.Label className="m-2 w-25 ">*Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del producto"
              required
              maxLength="70"
              value={name}
            />
          </Form.Group>

          <Form.Group className="d-flex mx-auto px-5 my-4" controlId="brand">
            <Form.Label className="m-2 w-25 ">*Marca del producto</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Marca del producto"
              required
              maxLength="70"
              value={brand}
            />
          </Form.Group>

          <Form.Group className="d-flex mx-auto px-5 my-4" controlId="slug">
            <Form.Label className="m-2 w-25 ">*Slug del producto</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Slug del producto (Ejemplo: producto-categoria-color)"
              required
              maxLength="70"
              value={slug}
            />
          </Form.Group>

          <Form.Group
            className="d-flex mx-auto px-5 my-4"
            controlId="description"
          >
            <Form.Label className="m-2 w-25">
              *Descripción del producto
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del producto"
              required
              maxLength="100"
              value={description}
            />
          </Form.Group>

          <Form.Group className="d-flex mx-auto px-5 my-4" controlId="price">
            <Form.Label className="m-2 w-25">*Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio del producto"
              maxLength="4"
              onChange={(e) => setPrice(e.target.value)}
              required
              value={price}
            />
          </Form.Group>

          <Form.Group
            className="d-flex mx-auto px-5 my-4"
            controlId="countInStock"
          >
            <Form.Label className="m-2 w-25">*Cantidad en Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad en stock"
              maxLength="4"
              onChange={(e) => setCountInStock(e.target.value)}
              required
              value={countInStock}
            />
          </Form.Group>

          <Form.Group className="d-flex mx-auto px-5 my-4" controlId="category">
            <Form.Label className="m-2 w-25">*Categoría</Form.Label>
            <Form.Select
              onChange={(e) => setCategory(e.target.value)}
              required
              value={category}
            >
              <option> Selecciona una categoría</option>
              <option value="ropa">Ropa</option>
              <option value="Pants">Pants</option>
              <option value="categoria3">Categoría 3</option>
              <option value="categoria4">Categoría 4</option>
              <option value="categoria5">Categoría 5</option>
              <option value="categoria6">Categoría 6</option>
              <option value="categoria7">Categoría 7</option>
              <option value="categoria8">Categoría 8</option>
              <option value="categoria9">Categoría 9</option>
              <option value="categoria10">Categoría 10</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="d-flex mx-auto px-5 my-4"
            controlId="image"
            value={image}
          >
            <Form.Label className="m-2 w-25">*Imagen</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
            {loadingUpload && <div> Cargandoo </div>}
          </Form.Group>
          <p className="text-end text-muted mx-5">
            La imagen debe ser en formato .jpg o .png
          </p>
          <Button className="mx-auto d-flex" variant="success" type="submit">
            Publicar producto
          </Button>
        </Form>
      </Container>
    </div>
  );
}
