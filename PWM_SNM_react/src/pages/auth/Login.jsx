import axios, {endpoints} from "../../utils/axios.js";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Button, Divider, Stack} from "@mui/material";
import RHFTextField from "../../components/RHFTextField.jsx";
import {useNavigate} from "react-router-dom";
import routes from "../../utils/routes.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export default function Login() {
    const [error, setError] = useState(false);
    const {login, getUser} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (getUser()) navigate(routes.profile.path);
    }, [getUser]);


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
                    <Stack spacing={2}>
                        <div>Credenziali SNM:</div>

                        <RHFTextField
                            name="username"
                            label="username"
                            type="text"
                        />

                        <RHFTextField
                            name="password"
                            label="password"
                            type="password"
                        />

                        <Divider/>

                        <Button type="submit">
                            Login
                        </Button>
                    </Stack>

                </Box>
            </FormProvider>

            {error && <div>Username o password errati</div>}
        </div>
    );
}