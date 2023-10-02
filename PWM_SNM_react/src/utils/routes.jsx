import {lazy} from "react";

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/auth/Login.jsx"));
const Register = lazy(() => import("../pages/auth/Register.jsx"));
const Page404 = lazy(() => import("../pages/Page404.jsx"));

const routes = {
    root: {path: '/', element: <Home/>},
    login: {path: '/login', element: <Login/>},
    register: {path: '/register', element: <Register/>},
    default: {path: '*', element: <Page404/>}
}

export const routesArray = Object.values(routes);

export default routes;
