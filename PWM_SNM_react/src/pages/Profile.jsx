import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import routes from "../utils/routes.jsx";
import {useEffect} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";

export default function Profile() {
    const {getUser, logout} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!getUser()) {
            navigate(routes.login.path);
        }
    }, [getUser]);


    const handleLogout = () => {
        logout();
        navigate(routes.login.path);
    }

    return <>
        <div>Profile of {getUser()?.username}</div>
        <Button onClick={handleLogout}>Logout</Button>
    </>
}
