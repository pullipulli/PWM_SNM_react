import React from "react";
import {Card, IconButton, Typography} from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import routes from "../utils/routes.jsx";
import {useNavigate} from "react-router-dom";

export default function PlaylistPreview({playlist, isOwner}) {
    const navigate = useNavigate();

    return <>
        <Card>
            <Typography variant="h5">{playlist._id.name}</Typography>
            <Typography variant="caption">by {playlist._id.owner}</Typography>
            <Typography variant="body1">{playlist.description}</Typography>

            <IconButton
                onClick={() => navigate(`${routes.playlists.path}/${playlist._id.owner}/${playlist._id.name}`)}>
                <OpenInFullIcon/>
            </IconButton>
        </Card>
    </>;
}