import axios, {endpoints} from "../../utils/axios.js";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import RHFTextField from "../../components/RHFTextField.jsx";
import {Button, Divider, Stack} from "@mui/material";
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
    const {getUser} = useAuthContext();

    useEffect(() => {
        if (getUser()) navigate(routes.profile.path);
    }, [getUser]);

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
        <div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <h2>Registrati!</h2>

                        <RHFTextField
                            type="email"
                            label="email"
                            name="email"
                        />

                        <RHFTextField
                            type="text"
                            label="name"
                            name="name"
                        />

                        <RHFTextField
                            type="text"
                            label="surname"
                            name="surname"
                        />

                        <RHFTextField
                            type="text"
                            label="username"
                            name="username"
                        />

                        <RHFTextField
                            type="password"
                            label="password"
                            name="password"
                        />

                        <RHFTextField
                            type="password"
                            label="password1"
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

            {error && <div>{error}</div>}
        </div>
    );
}