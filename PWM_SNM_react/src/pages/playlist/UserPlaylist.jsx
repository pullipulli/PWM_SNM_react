import {useAuthContext} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import routes from "../../utils/routes.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios, {endpoints} from "../../utils/axios.js";
import {Button, Stack} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import RHFTextField from "../../components/RHFTextField.jsx";
import RHFSwitch from "../../components/RHFSwitch.jsx";
import RHFAutocomplete from "../../components/RHFAutocomplete.jsx";
import PlaylistPreview from "../../components/PlaylistPreview.jsx";

export default function UserPlaylist() {
    const {getUser, isLoggedIn} = useAuthContext();
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const methods = useForm();
    const {user} = useParams();
    const isOwner = user === getUser()?.username;

    const handleAddPlaylist = async (data) => {
        data.owner = getUser()?.username;
        data.privacy = data.privacy === true ? 'public' : 'private';

        await axios.post(endpoints.playlists, data, { headers: {Authorization: getUser()?.username}});

        window.location.reload();
    }

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate(routes.login.path);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        axios.get(`${endpoints.playlists}/${user}`, { headers: {Authorization: getUser()?.username}}).then(res => {
            if (!isOwner)
                res.data = res.data.filter((playlist) => playlist.privacy === 'public')

            setPlaylists(res.data);
        });
    }, [getUser]);

    useEffect(() => {
        axios.get(endpoints.songs).then(res => {
            setSongs(res.data);
        });
    }, []);

    return <>
        <Stack direction="row" spacing={2}>
            {playlists.map((playlist) => {
                return <PlaylistPreview key={playlist._id.name} playlist={playlist}/>;
            })}
        </Stack>

        {isOwner && <>
            <h1>Se vuoi aggiungere un'altra playlist:</h1>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleAddPlaylist)}>
                    <Stack spacing={2}>
                        <RHFTextField type="text" name="name" label="Nome della playlist" required/>
                        <RHFAutocomplete name="songs" label="Canzoni da inserire in playlist" options={songs}
                                         getOptionLabel={(option) => {
                                             const artists = option.song.artists.map((artist) => {
                                                 return artist.name;
                                             });
                                             return `${option.song.name} (${artists})`;
                                         }}
                                         renderOption={(props, option) => {
                                             const artists = option.song.artists.map((artist) => {
                                                 return artist.name;
                                             });
                                             return (
                                                 <li {...props} key={option._id}>
                                                     {`${option.song.name} (${artists})`}
                                                 </li>
                                             );
                                         }}
                                         isOptionEqualToValue={(option, value) => option._id === value._id}
                                         multiple
                                         required/>
                        <RHFTextField type="text" name="description" label="Descrizione della playlist" multiline/>
                        <RHFSwitch labelOff="private" labelOn="public" name="privacy" label="prova"/>
                        <RHFTextField type="text" name="tags" label="Tags" multiline/>
                        <Button type="submit">Aggiungi playlist</Button>
                    </Stack>

                </form>
            </FormProvider>
        </>
        }

    </>
}