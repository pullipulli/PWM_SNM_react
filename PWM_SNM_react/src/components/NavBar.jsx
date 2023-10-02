import {NavLink} from "react-router-dom";
import {AppBar, Container, Stack, Typography} from "@mui/material";
import routes from "../utils/routes.jsx";


export default function NavBar() {
    return <AppBar position="static">
        <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" component={NavLink} to={routes.root.path}>Home</Typography>
                <Typography variant="h6" component={NavLink} to={routes.login.path}>Login</Typography>
                <Typography variant="h6" component={NavLink} to={routes.register.path}>Register</Typography>
            </Stack>
        </Container>
    </AppBar>
}