import {useAuthContext} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import routes from "../../utils/routes.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios, {endpoints} from "../../utils/axios.js";
import {Button, Divider, Grid, Stack, Typography} from "@mui/material";
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

    const [error, setError] = useState("Playlist dell'utente in caricamento. Attendere...");

    const handleAddPlaylist = async (data) => {
        data.owner = getUser().username;
        data.privacy = data.privacy === true ? 'public' : 'private';

        await axios.post(endpoints.playlists, data, { headers: {Authorization: getUser().username}});

        data._id = {
            owner: data.owner,
            name: data.name
        }

        methods.reset({
            name: '',
            description: '',
            privacy: false,
            songs: [],
            tags: ''
        });

        setPlaylists([...playlists, data]);
    }

    useEffect(() => {
        axios.get(`${endpoints.playlists}/${user}`, { headers: {Authorization: getUser()?.username}}).then(res => {
            if (!isOwner)
                res.data = res.data.filter((playlist) => playlist.privacy === 'public')

            setError('Non ci sono playlist da visualizzare.');
            setPlaylists(res.data);
        });
    }, [getUser]);

    useEffect(() => {
        axios.get(endpoints.songs).then(res => {
            setSongs(res.data);
        });
    }, []);

    return <Stack spacing={3} mt={3}>
            <Grid container spacing={3} columns={3}>
                {(playlists.length !== 0 && playlists.map((playlist) => {
                    return <Grid key={playlist._id.name} item zeroMinWidth xs={3} sm={3} md={1}>
                        <PlaylistPreview playlist={playlist}/>
                    </Grid>;
                })) || <Typography variant='caption'>{error}</Typography>}
            </Grid>

            <Divider/>

            {isOwner && <>
                <Typography variant="h4">Se vuoi aggiungere un'altra playlist:</Typography>
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
        </Stack>;
}