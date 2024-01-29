import './App.css'
import {Route, Routes} from "react-router-dom";
import {Suspense} from "react";

import NavBar from "./components/NavBar";
import {routesArray} from "./utils/routes.jsx";
import {useAuth} from "./hooks/useAuth.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import { Container } from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#1eb639'
            },
            secondary: {
                main: '#b61e9a'
            },
            info: {
                main: '#1e9ab6'
            },
            background: {
                paper: '#c3e9c5'
            },
        }
    });


    return (
        <>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </>
    )
}

export default App
