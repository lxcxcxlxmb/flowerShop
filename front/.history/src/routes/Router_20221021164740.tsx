import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Home } from "../pages/Home";
import { Users } from "../pages/Users";
import { Cities } from "../pages/Cities";
import { States } from "../pages/States";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";

export function Router() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/users"
        element={isAuthenticated ? <Navigate to="/" /> : <Users />}
      />
      <Route
        path="/cities"
        element={isAuthenticated ? <Navigate to="/" /> : <Cities />}
      />
      <Route
        path="/states"
        element={isAuthenticated ? <Navigate to="/" /> : <States />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
