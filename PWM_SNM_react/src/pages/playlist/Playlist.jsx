import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Link,
    Stack,
    Typography
} from "@mui/material";
import axios, {endpoints} from "../../utils/axios.js";
import EditIcon from '@mui/icons-material/Edit';
import RHFTextField from "../../components/RHFTextField.jsx";
import RHFAutocomplete from "../../components/RHFAutocomplete.jsx";
import RHFSwitch from "../../components/RHFSwitch.jsx";
import {FormProvider, useForm} from "react-hook-form";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import routes from "../../utils/routes.jsx";
import randomColor from "../../utils/randomColors.js";
import msToMinutes from "../../utils/msToMinutes.js";
import CopyIcon from "@mui/icons-material/ContentCopy.js";
import SearchBar from "../../components/SearchBar.jsx";

export default function PlaylistPreview() {
    const {getUser, isLoggedIn} = useAuthContext();
    const [playlist, setPlaylist] = useState({_id: {}});
    const [editPlaylist, setEditPlaylist] = useState(false);
    const methods = useForm();
    const [songs, setSongs] = useState([]);
    const {user, playlistName} = useParams();
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);
    const [avatarColor,] = useState(randomColor());
    const [filteredSongs, setFilteredSongs] = useState([]);

    const filterSongs = (searchInput) => {
        searchInput = searchInput.toUpperCase();

        setFilteredSongs(
            playlist?.songs?.filter((song) => {
                song = song.song;
                return song.name.toUpperCase().match(searchInput) ||
                    song.album.name.toUpperCase().match(searchInput) ||
                    song.artists.some((artist) => artist.name.toUpperCase().match(searchInput)) ||
                    song.artists.some((artist) => artist?.genres?.some((genre) => genre?.toUpperCase().match(searchInput)));
            })
        );
    };

    useEffect(() => {
        setFilteredSongs(playlist?.songs);
    }, [playlist]);

    useEffect(() => {
        axios.get(`${endpoints.playlists}/${user}/${playlistName}`).then(res => {
            setPlaylist(res.data);
            setIsOwner(res.data._id.owner === getUser()?.username);
        });
    }, [playlistName, user]);

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
                                     renderOption={(props, option) => {
                                         return (
                                             <li {...props} key={option._id}>
                                                 {option.song.name}
                                             </li>
                                         );
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

    const CopyPlaylistButton = (props) => {
        let onClick = props.onClick;

        return <IconButton onClick={onClick}>
            <CopyIcon/>
        </IconButton>;
    }

    const onCopyClick = async () => {
        let newPlaylist = playlist;

        newPlaylist.owner = getUser()?.username;
        newPlaylist.name = newPlaylist._id.name + " (Copy)";

        delete newPlaylist['_id'];

        await axios.post(endpoints.playlists, newPlaylist)

        navigate(routes.playlists.path + '/' + getUser()?.username);
    };

    const deletePlaylist = () => {
        axios.delete(`${endpoints.playlists}/${playlist._id.owner}/${playlist._id.name}`)
            .then(() => navigate(routes.playlists.path + '/' + user));
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

        <Stack direction="row" alignItems="center" justifyContent="stretch">
            <Avatar variant="square"
                    sx={{bgcolor: avatarColor, height: '300px', width: '30%'}}>{playlistName.charAt(0)}</Avatar>
            <Stack>
                <Typography variant="subtitle1">Playlist {playlist?.privacy}</Typography>
                <Typography variant="h5">{playlistName}</Typography>
                <Typography variant="caption">by {user}</Typography>
                <Typography variant="caption">Descrizione: {playlist?.description}</Typography>
                <Typography variant="caption">Tags: {'#' + playlist?.tags?.join('#')}</Typography>
            </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Song list:</Typography>
            <SearchBar filterFunction={filterSongs}
                   placheholder="Cerca per: nome, album, genere o autore"
                   sx={{width:'30%'}}
            />
        </Stack>
        
        <Stack spacing={1}>
            {filteredSongs?.map((song) => <Accordion key={song._id}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon/>}
                    >
                        <Typography>{song.song.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Album: {song.song.album.name} ({song.song.album.release_date})
                        </Typography>
                        <Typography>
                            Durata della canzone: {msToMinutes(song.song.duration_ms)}
                        </Typography>
                        <Typography>
                            Autore/i: {
                            (song.song.artists.map((artist) => artist.name))
                        }
                        </Typography>
                        <Typography>
                            Genere/i: {song.song.artists.map((artist) => {
                                if (artist.genres === undefined || artist.genres.length === 0)
                                    return "Generi non disponibili";
                                return artist.genres;
                            })}
                        </Typography>

                        <Link target='_blank' href={song.song.preview_url}>Preview</Link>
                    </AccordionDetails>
                </Accordion>
            )}
        </Stack>

        {isLoggedIn() && <CopyPlaylistButton onClick={onCopyClick}/>}

        {isOwner && <EditButton/>}

        {isOwner && <IconButton onClick={deletePlaylist}>
            <DeleteIcon sx={{color: "red"}}/>
        </IconButton>}
    </>;
}