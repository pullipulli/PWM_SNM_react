import './App.css'
import {Route, Routes} from "react-router-dom";
import {Suspense} from "react";

import NavBar from "./components/NavBar";
import {routesArray} from "./utils/routes.jsx";
import {useAuth} from "./hooks/useAuth.js";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
    const {user, login, logout} = useAuth();

    return (
        <>
            <AuthContext.Provider value={{user, login, logout}}>
                <NavBar/>
                <Suspense fallback={<div className="container">Loading...</div>}>
                    <Routes>
                        {routesArray.map((route) => {
                                return <Route key={route.path} path={route.path} element={route.element}/>
                            }
                        )}
                    </Routes>
                </Suspense>
            </AuthContext.Provider>
        </>
    )
}

export default App
