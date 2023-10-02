import './App.css'
import {Route, Routes} from "react-router-dom";
import {Suspense} from "react";

import NavBar from "./components/NavBar";
import {routesArray} from "./utils/routes.jsx";

function App() {
    return (
        <>
            <NavBar/>
            <Suspense fallback={<div className="container">Loading...</div>}>
                <Routes>
                    {routesArray.map((route) => {
                            return <Route key={route.path} path={route.path} element={route.element}/>
                        }
                    )}
                </Routes>
            </Suspense>
        </>
    )
}

export default App
