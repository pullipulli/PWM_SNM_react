import {useEffect, useState} from "react";
import axios, {endpoints} from "../utils/axios.js";
import PlaylistPreview from "../components/PlaylistPreview.jsx";
import {Grid, Stack, Typography} from "@mui/material";
import SearchBar from "../components/SearchBar.jsx";

export default function Home() {
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);

    const filterPlaylist = (searchInput) => {
        searchInput = searchInput.toUpperCase();
        setFilteredPlaylists(
            playlists.filter((playlist) => {
                return playlist._id.name.toUpperCase().match(searchInput) ||
                    playlist._id.owner.toUpperCase().match(searchInput) ||
                    playlist.tags.some((tag) => tag.toUpperCase().match(searchInput)) ||
                    playlist.songs.some((song) => song.song.name.toUpperCase().match(searchInput));
            })
        );
    };

    useEffect(() => {
        setFilteredPlaylists(playlists);
    }, [playlists]);

    useEffect(() => {
        axios.get(endpoints.publicPlaylists).then((res) => {
            setPlaylists(res.data);
        });
    }, []);


    return <>
        <SearchBar filterFunction={filterPlaylist} sx={{mt:2}}
                   placeholder="Cerca per: nome, proprietario, tags o nome di canzoni contenute"/>
        <Grid container spacing={3} columns={3} mt={2}>
            {(playlists.length !== 0 && filteredPlaylists.map((playlist, index) => <Grid key={playlist._id.name} item zeroMinWidth xs={3} sm={3} md={1}>
                    <PlaylistPreview key={index} playlist={playlist}/>
                </Grid>)) || <Typography variant="caption">Playlist pubbliche in caricamento. Attendere...</Typography>}
        </Grid>
    </>;
}