import {Button, Stack, TableBody, TableCell, Table, TableRow, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import routes from "../utils/routes.jsx";
import {useEffect} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import axios, { endpoints } from "../utils/axios.js";

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
    
    const handleDelete = () => {
        axios.delete(`${endpoints.users}/${getUser().username}`, { headers: {Authorization: getUser().username} }).then(
            () => {
                logout();
                navigate(routes.login.path);
            }
        );
    }

    const handlePlaylists = () => {
        navigate(`${routes.playlists.path}/${getUser().username}`);
    }


    return <>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Typography variant="h5">Nome utente</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6'>{getUser().username}</Typography>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                        <Typography variant="h5">Nome</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6'>{getUser().name}</Typography>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                        <Typography variant="h5">Cognome</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6'>{getUser().surname}</Typography>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                        <Typography variant="h5">Email</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='h6'>{getUser().email}</Typography>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                        <Typography variant="h5">Generi preferiti </Typography>
                    </TableCell>
                    <TableCell>
                            {getUser().favouriteGenres.map((genre, index, genres) => {
                                let output = genre._id;
                                if(index !== genres.length - 1)
                                    output += ', '
                                return <Typography key={genre._id} variant="h6" display='inline'>{output}</Typography>
                            })}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                        <Typography variant="h5">Artisti preferiti </Typography>
                    </TableCell>
                    <TableCell>
                            {getUser().favouriteArtists.map((artist, index, artists) => {
                                let output = artist.artist.name;
                                if(index !== artists.length - 1)
                                    output += ', '
                                return <Typography key={artist._id} variant="h6" display='inline'>{output}</Typography>
                            })}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Stack direction={{sm: 'column', md: 'row'}}>
            <Button onClick={handleUpdate}>Voglio modificare i miei dati</Button>
            <Button onClick={handleDelete}>Voglio eliminare il mio profilo</Button>
            <Button onClick={handlePlaylists}>Le mie playlist</Button>
        </Stack>
    </>
}
