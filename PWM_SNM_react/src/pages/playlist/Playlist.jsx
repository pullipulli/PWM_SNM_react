import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import axios, {endpoints} from "../../utils/axios.js";
import EditIcon from '@mui/icons-material/Edit';
import RHFTextField from "../../components/RHFTextField.jsx";
import RHFAutocomplete from "../../components/RHFAutocomplete.jsx";
import RHFSwitch from "../../components/RHFSwitch.jsx";
import {FormProvider, useForm} from "react-hook-form";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import routes from "../../utils/routes.jsx";
import randomColor from "../../utils/randomColors.js";

export default function PlaylistPreview() {
    const {getUser} = useAuthContext();
    const [playlist, setPlaylist] = useState();
    const [editPlaylist, setEditPlaylist] = useState(false);
    const methods = useForm();
    const [songs, setSongs] = useState([]);
    const {user, playlistName} = useParams();
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);
    const [avatarColor,] = useState(randomColor());

    useEffect(() => {
        axios.get(`${endpoints.playlists}/${user}/${playlistName}`).then(res => {
            setPlaylist(res.data);
            setIsOwner(res.data._id.owner === getUser().username);
        });
    }, []);

    useEffect(() => {
        axios.get(endpoints.songs).then(res => {
            setSongs(res.data);
        });
    }, []);

    const handleUpdatePlaylist = (data) => {
        data.owner = getUser()?.username;
        data.privacy = data.privacy === true ? 'public' : 'private';
        axios.put(`${endpoints.playlists}/${playlist._id.owner}/${playlist._id.name}`, data).then(() => {
            setEditPlaylist(!editPlaylist);
            window.location.reload();
        });
    }

    const EditPlaylistForm = (props) => {
        return <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleUpdatePlaylist)}>
                <Stack spacing={2}>
                    <RHFTextField type="text" name="name" label="Nome della playlist"
                                  required/>
                    <RHFAutocomplete name="songs" label="Canzoni da inserire in playlist" options={songs}
                                     getOptionLabel={(option) => {
                                         const artists = option.song.artists.map((artist) => {
                                             return artist.name;
                                         });
                                         return `${option.song.name} (${artists})`;
                                     }}
                                     isOptionEqualToValue={(option, value) => option._id === value._id}
                                     multiple
                                     required/>
                    <RHFTextField type="text" name="description" label="Descrizione della playlist" multiline/>
                    <RHFSwitch labelOff="private" labelOn="public" name="privacy" label="privacy"/>
                    <RHFTextField type="text" name="tags" label="Tags" multiline/>
                </Stack>
                <DialogActions>
                    <Button onClick={() => setEditPlaylist(!editPlaylist)}>Cancel</Button>
                    <Button type="submit">Modifica</Button>
                </DialogActions>
            </form>
        </FormProvider>;
    };

    const EditButton = (props) => {
        const privacy = playlist.privacy === 'public';

        return <IconButton onClick={() => {
            methods.reset({
                name: playlist._id.name,
                songs: playlist.songs,
                description: playlist.description,
                privacy: privacy,
                tags: "#" + playlist.tags.join("#"),
            });
            setEditPlaylist(!editPlaylist)
        }}>
            <EditIcon/>
        </IconButton>;
    }

    const deletePlaylist = () => {
        axios.delete(`${endpoints.playlists}/${playlist._id.owner}/${playlist._id.name}`)
            .then(() => navigate(routes.playlists.path + '/' + user));
    }

    return <>
        <Dialog
            open={editPlaylist}
            onClose={() => setEditPlaylist(!editPlaylist)}
        >
            <DialogTitle>Aggiorna i dati della tua playlist!</DialogTitle>
            <DialogContent>
                <EditPlaylistForm/>
            </DialogContent>
        </Dialog>

        <Stack direction="row" alignItems="center" justifyContent="stretch">
            <Avatar variant="square"
                    sx={{bgcolor: avatarColor, height: '300px', width: '30%'}}>{playlistName.charAt(0)}</Avatar>
            <Stack>
                <Typography variant="subtitle1">Playlist {playlist?.privacy}</Typography>
                <Typography variant="h5">{playlistName}</Typography>
                <Typography variant="caption">by {user}</Typography>
                <Typography variant="caption">Descrizione: {playlist?.description}</Typography>
                <Typography variant="caption">Tags: {'#' + playlist?.tags.join('#')}</Typography>
            </Stack>
        </Stack>

        <Typography variant="h5">Song list:</Typography>
        <List>
            {playlist?.songs.map((song) => <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={song.song.name}/>
                    </ListItemButton>
                </ListItem>
            )}
        </List>


        {isOwner && <EditButton/>}

        {isOwner && <IconButton onClick={deletePlaylist}>
            <DeleteIcon sx={{color: "red"}}/>
        </IconButton>}
    </>;
}