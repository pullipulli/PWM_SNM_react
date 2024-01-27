import './App.css'
import {Route, Routes} from "react-router-dom";
import {Suspense} from "react";

import NavBar from "./components/NavBar";
import {routesArray} from "./utils/routes.jsx";
import {useAuth} from "./hooks/useAuth.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import { Container } from '@mui/material';

function App() {
    return (
        <>
            <AuthContext.Provider value={useAuth()}>
                <NavBar/>
                <Container>
                    <Suspense fallback={<div className="container">Loading...</div>}>
                        <Routes>
                            {routesArray.map((route) => {
                                    return <Route key={route.path} path={route.path} element={route.element}/>
                                }
                            )}
                        </Routes>
                    </Suspense>
                </Container>
                
            </AuthContext.Provider>
        </>
    )
}

export default App
