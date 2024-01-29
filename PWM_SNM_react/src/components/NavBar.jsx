import {NavLink, useNavigate} from "react-router-dom";
import {AppBar, Container, IconButton, Stack, Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import routes from "../utils/routes.jsx";
import {useAuthContext} from "../context/AuthContext.jsx";
import "./style/NavBarStyle.css";

export default function NavBar() {
    const {isLoggedIn, logout, getUser} = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(routes.login.path);
    }

    return <AppBar position="static">
        <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between">
                <Typography className="link" variant="button" component={NavLink} to={routes.root.path}>Home</Typography>
                {!isLoggedIn() &&
                    <Typography className="link" variant="button" component={NavLink} to={routes.login.path}>Login</Typography>}
                {!isLoggedIn() &&
                    <Typography className="link" variant="button" component={NavLink} to={routes.register.path}>Register</Typography>}
                {isLoggedIn() &&
                    <Typography className="link" variant="button" component={NavLink} to={routes.profile.path}>Profile ({getUser()?.username})</Typography>}
                {isLoggedIn() &&
                    <IconButton variant="contained" onClick={handleLogout}>
                        <LogoutIcon/>
                    </IconButton>}
            </Stack>
        </Container>
    </AppBar>
}