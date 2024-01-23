import {useEffect, useState} from "react";
import axios, {endpoints} from "../utils/axios.js";
import PlaylistPreview from "../components/PlaylistPreview.jsx";
import {Stack} from "@mui/material";

export default function Home() {
    const [playlists, setPlaylists] = useState();

    useEffect(() => {
        axios.get(endpoints.publicPlaylists).then((res) => {
            setPlaylists(res.data);
        });
    }, []);
    return <Stack spacing={3}>
        {playlists?.map((playlist, index) => <PlaylistPreview key={index} playlist={playlist}/>)}
    </Stack>;
}