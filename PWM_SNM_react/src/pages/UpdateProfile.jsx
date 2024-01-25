import {useAuthContext} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import routes from "../utils/routes.jsx";
import {useEffect, useState} from "react";
import {Button, Divider, Stack, Typography} from "@mui/material";
import RHFTextField from "../components/RHFTextField.jsx";
import RHFAutocomplete from "../components/RHFAutocomplete.jsx";
import {FormProvider, useForm} from "react-hook-form";
import axios, {endpoints} from "../utils/axios.js";

export default function UpdateProfile() {
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([])
    const {isLoggedIn, getUser, login} = useAuthContext();
    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            newPassword1: "",
        }
    });

    useEffect(() => {
        axios.get(endpoints.genres).then((data) => {
            setGenres(data.data);
        });
    }, []);

    useEffect(() => {
        axios.get(endpoints.artists).then((data) => {
            setArtists(data.data);
        });
    }, []);

    useEffect(() => {
        methods.reset({
                favouriteGenres: getUser()?.favouriteGenres,
                favouriteArtists: getUser()?.favouriteArtists
            }
        );
    }, [genres, artists]);

    useEffect(() => {
        if (!isLoggedIn())
            navigate(routes.login.path);
    }, [isLoggedIn]);

    const onSubmit = async (data) => {
        try {
            const res = await axios.put(`${endpoints.users}/${getUser()?.username}`, data);
            login(res.data);
            methods.reset();
            navigate(routes.profile.path);
        } catch (err) {
            console.log(err);
        }
    };

    return <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <h2>Puoi aggiornare la password oppure i tuoi artisti e generi musicali preferiti! </h2>
                <Typography variant="subtitle1">Se non vuoi aggiornare la password, semplicemente lascia i campi
                    relativi vuoti.</Typography>
                <RHFTextField
                    type="password"
                    label="Password attuale"
                    name="currentPassword"
                />

                <RHFTextField
                    type="password"
                    label="Nuova Password"
                    name="newPassword"
                />

                <RHFTextField
                    type="password"
                    label="Conferma Nuova Password"
                    name="newPassword1"
                />

                <RHFAutocomplete
                    name="favouriteGenres"
                    options={genres}
                    defaultValue={getUser()?.favouriteGenres}
                    getOptionLabel={(option) => option._id}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option._id}>
                                {option._id}
                            </li>
                        );
                    }}
                    label="Generi preferiti"
                    multiple
                />

                <RHFAutocomplete
                    name="favouriteArtists"
                    options={artists}
                    defaultValue={getUser()?.favouriteArtists}
                    getOptionLabel={(option) => option.artist.name}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option._id}>
                                {option.artist.name}
                            </li>
                        );
                    }}
                    label="Artisti preferiti"
                    multiple
                />

                <Divider/>

                <Button type="submit">
                    Modifica i miei dati.
                </Button>
            </Stack>
        </form>
    </FormProvider>;
}