import {NavLink, useNavigate} from "react-router-dom";
import {AppBar, Button, Container, Stack, Typography} from "@mui/material";
import routes from "../utils/routes.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";


export default function NavBar() {
    const {isLoggedIn, logout} = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(routes.login.path);
    }

    return <AppBar position="static">
        <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" component={NavLink} to={routes.root.path}>Home</Typography>
                {!isLoggedIn() &&
                    <Typography variant="h6" component={NavLink} to={routes.login.path}>Login</Typography>}
                {!isLoggedIn() &&
                    <Typography variant="h6" component={NavLink} to={routes.register.path}>Register</Typography>}
                {isLoggedIn() &&
                    <Typography variant="h6" component={NavLink} to={routes.profile.path}>Profile</Typography>}
                {isLoggedIn() &&
                    <Button variant="contained" onClick={handleLogout}>
                        <Typography variant="h6">Logout</Typography>
                    </Button>}
            </Stack>
        </Container>
    </AppBar>
}