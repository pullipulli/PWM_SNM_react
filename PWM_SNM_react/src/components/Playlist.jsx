import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Stack
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios, {endpoints} from "../utils/axios.js";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RHFTextField from "./RHFTextField.jsx";
import RHFAutocomplete from "./RHFAutocomplete.jsx";
import RHFSwitch from "./RHFSwitch.jsx";
import {FormProvider, useForm} from "react-hook-form";
import {useAuthContext} from "../context/AuthContext.jsx";

export default function Playlist({playlist, isOwner}) {
    const {getUser} = useAuthContext();
    const [openSongs, setOpenSongs] = useState(true);
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

    const handleClick = () => {
        setOpenSongs(!openSongs);
    };

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
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Playlist {playlist._id.name} di {playlist._id.owner}
                        </ListSubheader>
                    }
                >
                    {isOwner && <EditButton/>}

                    <ListItemButton>
                        <ListItemText primary={playlist.description} secondary="Descrizione"/>
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemText primary={playlist.tags.toString()} secondary="Tags"/>
                    </ListItemButton>

                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Lista canzoni"/>
                        {openSongs ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={openSongs} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {playlist.songs.map((song) => {
                                return <ListItemButton key={song._id} sx={{pl: 4}}>
                                    <ListItemText primary={song.song.name}/>
                                </ListItemButton>
                            })}
                        </List>
                    </Collapse>

                    {isOwner && <IconButton onClick={deletePlaylist}>
                        <DeleteIcon sx={{color: "red"}}/>
                    </IconButton>
                    }
                </List>
            </Card> : <div>Eliminata</div>}
    </>;
}