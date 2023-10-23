import React, {useState} from "react";
import {Card, Collapse, IconButton, List, ListItemButton, ListItemText, ListSubheader} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios, {endpoints} from "../utils/axios.js";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Playlist({playlist}) {
    const [openSongs, setOpenSongs] = useState(true);
    const [showPlaylist, setShowPlaylist] = useState(true);
    const [editPlaylist, setEditPlaylist] = useState(false);

    const EditPlaylistForm = (props) => {
        return <div>EditForm</div>;
    };

    const EditButton = (props) => {
        return <IconButton onClick={() => setEditPlaylist(!editPlaylist)}>
            {editPlaylist ? <CloseIcon/> : <EditIcon/>}
        </IconButton>;
    }

    const handleClick = () => {
        setOpenSongs(!openSongs);
    };

    const deletePlaylist = () => {
        axios.delete(`${endpoints.playlists}/${playlist._id.owner}/${playlist._id.name}`);
        setShowPlaylist(false);
    }

    if (editPlaylist) return <>
        <EditButton/>
        <EditPlaylistForm/>
    </>;

    return <>{showPlaylist ? <Card>
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
            <EditButton/>
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
                        console.log(song)
                        return <ListItemButton key={song._id} sx={{pl: 4}}>
                            <ListItemText primary={song.song.name}/>
                        </ListItemButton>
                    })}
                </List>
            </Collapse>

            <IconButton onClick={deletePlaylist}>
                <DeleteIcon sx={{color: "red"}}/>
            </IconButton>


            {/* TODO modo per modificare una canzone */}
        </List>
    </Card> : <div>Eliminata</div>}</>;
}