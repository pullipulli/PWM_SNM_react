import axios, {endpoints} from "../../utils/axios.js";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import RHFTextField from "../../components/RHFTextField.jsx";
import {useNavigate} from "react-router-dom";
import routes from "../../utils/routes.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export default function Login() {
    const [error, setError] = useState(false);
    const {login, isLoggedIn} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) navigate(routes.profile.path);
    }, [isLoggedIn]);


    const methods = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(endpoints.login, data);
            login(res.data);
            setError(false);
            methods.reset();
            navigate(routes.profile.path);
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    return (
        <div>
            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stack spacing={2} mt={2}>
                        <Typography variant="h4">Login</Typography>

                        <RHFTextField
                            name="username"
                            label="Username"
                            type="text"
                        />

                        <RHFTextField
                            name="password"
                            label="Password"
                            type="password"
                        />

                        <Divider/>

                        <Button type="submit">
                            Login
                        </Button>
                    </Stack>

                </Box>
            </FormProvider>

            {error && <Typography variant="caption">Username o password errati</Typography>}
        </div>
    );
}