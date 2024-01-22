import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import routes from "../utils/routes.jsx";
import {useEffect} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";

export default function Profile() {
    const {isLoggedIn, getUser, logout} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate(routes.login.path);
        }
    }, [isLoggedIn]);

    const handleUpdate = () => {
        navigate(routes.updateProfile.path);
    };

    const handlePlaylists = () => {
        navigate(`${routes.playlists.path}/${getUser().username}`);
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
                    return <Typography key={genre._id}
                                       variant="caption">{genre._id}</Typography>;
                })}

            </Stack>
            <Typography variant="caption">Artisti preferiti: </Typography>
            <Stack>
                {getUser()?.favouriteArtists?.map((artist) => {
                    return <Typography key={artist._id}
                                       variant="caption">{artist.artist.name}</Typography>;
                })}
            </Stack>
        </Stack>
        <Button onClick={handleUpdate}>Voglio modificare i miei dati</Button>
        <Button onClick={handlePlaylists}>Le mie playlist</Button>
    </>
}
