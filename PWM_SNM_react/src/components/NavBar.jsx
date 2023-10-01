import {NavLink} from "react-router-dom";
import {AppBar, Container, Stack, Typography} from "@mui/material";


export default function NavBar() {
    return <AppBar position="static">
        <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" component={NavLink} to="/">Home</Typography>
                <Typography variant="h6" component={NavLink} to="/login">Login</Typography>
                <Typography variant="h6" component={NavLink} to="/register">Register</Typography>
            </Stack>
        </Container>
    </AppBar>
}