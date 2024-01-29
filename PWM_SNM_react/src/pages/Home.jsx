import {useEffect, useState} from "react";
import axios, {endpoints} from "../utils/axios.js";
import PlaylistPreview from "../components/PlaylistPreview.jsx";
import {Stack} from "@mui/material";
import SearchBar from "../components/SearchBar.jsx";

export default function Home() {
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);

    const filterPlaylist = (searchInput) => {
        searchInput = searchInput.toUpperCase();
        setFilteredPlaylists(
            playlists?.filter((playlist) => {
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
        <Stack spacing={3} direction='row' mt={2}>
            {filteredPlaylists?.map((playlist, index) => <PlaylistPreview key={index} playlist={playlist}/>)}
        </Stack>
    </>;
}