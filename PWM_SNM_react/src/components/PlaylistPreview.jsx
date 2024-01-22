import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import axios, {endpoints} from "../utils/axios.js";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RHFTextField from "./RHFTextField.jsx";
import RHFAutocomplete from "./RHFAutocomplete.jsx";
import RHFSwitch from "./RHFSwitch.jsx";
import {FormProvider, useForm} from "react-hook-form";
import {useAuthContext} from "../context/AuthContext.jsx";

export default function PlaylistPreview({playlist, isOwner}) {
    const {getUser} = useAuthContext();
    const [showPlaylist, setShowPlaylist] = useState(true);
    const [editPlaylist, setEditPlaylist] = useState(false);
    const methods = useForm();
    const [songs, setSongs] = useState([]);

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
        axios.delete(`${endpoints.playlists}/${playlist._id.owner}/${playlist._id.name}`).then(() => setShowPlaylist(false));
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

        {showPlaylist ?
            <Card>
                <Typography variant="h5">{playlist._id.name}</Typography>
                <Typography variant="caption">by {playlist._id.owner}</Typography>
                <Typography variant="body1">{playlist.description}</Typography>

                {isOwner && <EditButton/>}

                {isOwner && <IconButton onClick={deletePlaylist}>
                    <DeleteIcon sx={{color: "red"}}/>
                </IconButton>}
            </Card> : <div>Eliminata</div>}
    </>;
}