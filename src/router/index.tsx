import { useRoutes } from "react-router-dom"
import HomePage from "../pages/home";
import LoginPage from "../pages/auth";
import NotFoundPage from "../pages/not-found";
import RegisterPage from "../pages/register";
import PrivateRouter from "./private-router";

const Routers = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "setting/*", element: <PrivateRouter /> },
    { path: "login", element: <LoginPage /> },
    { path: "*", element: <NotFoundPage /> }
  ]);
  return element;
}

export default Routers
