import {Button, Stack, Typography} from "@mui/material";
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
        <Stack>
            <Typography variant="caption">Nome utente: {getUser()?.username}</Typography>
            <Typography variant="caption">Nome: {getUser()?.name}</Typography>
            <Typography variant="caption">Cognome: {getUser()?.surname}</Typography>
            <Typography variant="caption">Email: {getUser()?.email}</Typography>
            <Typography variant="caption">Generi preferiti: </Typography>
            <Stack>
                {getUser()?.favouriteGenres?.map((genre) => {
                    return <Typography key={genre}
                                       variant="caption">{genre._id}</Typography>;
                })}

            </Stack>
            <Typography variant="caption">Artisti preferiti: </Typography>
            <Stack>
                {getUser()?.favouriteArtists?.map((artist) => {
                    return <Typography key={artist}
                                       variant="caption">{artist.artist.name}</Typography>;
                })}
            </Stack>
        </Stack>
        <Button>Voglio modificare i miei dati</Button> {/*TODO*/}
        <Button onClick={handleLogout}>Logout</Button>
    </>
}
