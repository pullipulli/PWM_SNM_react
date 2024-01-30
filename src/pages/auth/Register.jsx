import axios, {endpoints} from "../../utils/axios.js";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import RHFTextField from "../../components/RHFTextField.jsx";
import {Button, Divider, Stack, Typography} from "@mui/material";
import RHFAutocomplete from "../../components/RHFAutocomplete.jsx";
import {useNavigate} from "react-router-dom";
import routes from "../../utils/routes.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export default function Register() {
    const [error, setError] = useState(false);
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([])
    const methods = useForm();
    const navigate = useNavigate();
    const {isLoggedIn} = useAuthContext();

    useEffect(() => {
        if (isLoggedIn()) navigate(routes.profile.path);
    }, [isLoggedIn]);

    useEffect(() => {
        axios.get(endpoints.genres).then((data) => {
            setGenres(data.data);
        });
    }, []);

    useEffect(() => {
        axios.get(endpoints.artists).then((data) => {
            setArtists(data.data);
        })
    }, []);

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(endpoints.register, data);
            setError(false);
            navigate(routes.login.path);
            methods.reset();
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stack spacing={2} mt={2}>
                        <Typography variant="h4">Registrati!</Typography>

                        <RHFTextField
                            type="email"
                            label="E-mail"
                            name="email"
                        />

                        <RHFTextField
                            type="text"
                            label="Nome"
                            name="name"
                        />

                        <RHFTextField
                            type="text"
                            label="Cognome"
                            name="surname"
                        />

                        <RHFTextField
                            type="text"
                            label="Username"
                            name="username"
                        />

                        <RHFTextField
                            type="password"
                            label="Password"
                            name="password"
                        />

                        <RHFTextField
                            type="password"
                            label="Conferma Password"
                            name="password1"
                        />

                        <RHFAutocomplete
                            name="favouriteGenres"
                            options={genres}
                            getOptionLabel={(option) => option._id}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            label="Generi preferiti"
                            multiple
                        />

                        <RHFAutocomplete
                            name="favouriteArtists"
                            options={artists}
                            getOptionLabel={(option) => option.artist.name}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            label="Artisti preferiti"
                            multiple
                        />

                        <Divider/>

                        <Button type="submit">
                            Register
                        </Button>
                    </Stack>
                </form>
            </FormProvider>

            {error && <Typography variant="caption">{error}</Typography>}
        </>
    );
}