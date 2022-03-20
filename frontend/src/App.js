import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarNav from "./components/Navbar.js";
import LoginScreen from "./screens/LoginScreen/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrincipalScreen from "./screens/PrincipalScreen/PrincipalScreen.js";
import CategoryScreen from "./screens/CategoryScreen/CategoryScreen.js";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import DashboardScreen from "./screens/DashboardScreen/DashboardScreen.js";
import ProductScreen from "./screens/ProductScreen/ProductScreen.js";
import AdminRoute from "./components/AdminRoute.js";
import ProductListScreen from "./screens/ProductListScreen/ProductListScreen.js";
import CreateProducts from "./screens/ProductCreate/CreateProducts.js";
import ProductEditScreen from "./screens/ProductEditScreen/ProductEditScreen.js";
import UsersListScreen from "./screens/UsersListScreen/UsersListScreen.js";
import UserEditScreen from "./screens/UserEditScreen/UserEditScreen.js";
import ProductsMyScreen from "./screens/ProductsMyScreen/ProductsMyScreen.js";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={5} />
      <BarNav />
      <Routes>
        <Route path="/" element={<PrincipalScreen />} />
        <Route path="/iniciar" element={<LoginScreen />} />
        <Route path="/registrarse" element={<RegisterScreen />} />
        <Route path="/category/:category" element={<CategoryScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publicar"
          element={
            <ProtectedRoute>
              <CreateProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-productos/:seller"
          element={
            <ProtectedRoute>
              <ProductsMyScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductListScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <AdminRoute>
              <ProductEditScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/"
          element={
            <AdminRoute>
              <UsersListScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <AdminRoute>
              <UserEditScreen />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
