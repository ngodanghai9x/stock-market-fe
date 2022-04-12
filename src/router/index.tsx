import { useRoutes } from "react-router-dom"
import HomePage from "../pages/home";
import AuthPage from "../pages/auth";
import NotFoundPage from "../pages/not-found";
import RegisterPage from "../pages/register";
import PrivateRouter from "./private-router";
import AdminRouter from "./admin-router";
import UnauthorizedPage from "../pages/unauthorized";

const Routers = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    // { path: "register", element: <RegisterPage /> },
    { path: "setting/*", element: <PrivateRouter /> },
    { path: "forgot-password", element: <AuthPage /> },
    { path: "register", element: <AuthPage /> },
    { path: "login", element: <AuthPage /> },
    { path: "admin/*", element: <AdminRouter /> },
    { path: "unauthorized", element: <UnauthorizedPage /> },
    { path: "*", element: <NotFoundPage /> }
  ]);
  return element;
}

export default Routers
