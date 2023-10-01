import './App.css'
import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";

import NavBar from "./components/NavBar";
import Register from "./pages/auth/Register.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Page404 = lazy(() => import("./pages/Page404.jsx"));

function App() {
    return (
        <>
            <NavBar/>
            <Suspense fallback={<div className="container">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </Suspense>
        </>
    )
}

export default App
