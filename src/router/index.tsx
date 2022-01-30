import { Route, Routes, useRoutes } from "react-router-dom"
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/not-found";
import RegisterPage from "../pages/register";

const Routers = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "*", element: <NotFoundPage /> }
  ]);
  return element;
}

export default Routers
