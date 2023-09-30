import {NavLink} from "react-router-dom";
import {AppBar, Container, Stack, Typography} from "@mui/material";
import {endpoints} from "../utils/axios.js";


export default function NavBar() {
    return <AppBar position="static">
        <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" component={NavLink} to="/">Home</Typography>
                <Typography variant="h6" component={NavLink} to={endpoints.login}>Login</Typography>
            </Stack>
        </Container>
    </AppBar>
}