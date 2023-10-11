import React, {useState} from "react";
import {Card, Collapse, List, ListItemButton, ListItemText, ListSubheader} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function Playlist({playlist}) {
    const [openSongs, setOpenSongs] = useState(true);

    const handleClick = () => {
        setOpenSongs(!openSongs);
    };

    return <Card>
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
            <ListItemButton>
                <ListItemText primary={playlist.description} secondary="Descrizione"/>
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
        </List>
    </Card>;
}