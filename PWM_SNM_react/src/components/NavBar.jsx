import {NavLink} from "react-router-dom";
import {AppBar, Container, Stack, Typography} from "@mui/material";
import routes from "../utils/routes.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";


export default function NavBar() {
    const {isLoggedIn} = useAuthContext();

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
            </Stack>
        </Container>
    </AppBar>
}