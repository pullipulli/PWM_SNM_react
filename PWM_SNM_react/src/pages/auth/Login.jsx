import axios, {endpoints} from "../../utils/axios.js";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Button, Divider, Stack} from "@mui/material";
import RHFTextField from "../../components/RHFTextField.jsx";

export default function Login() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isSomeoneLogged, setIsSomeoneLogged] = useState(false);
    const [error, setError] = useState(false);

    const methods = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsSomeoneLogged(true);
            setUser(user);
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(endpoints.login, data);
            setIsSomeoneLogged(true);
            setUser(res.data);
            setError(false);
            methods.reset();
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    const handleLogout = async (e) => {
        setUser(null);
        setIsSomeoneLogged(false);
        localStorage.clear();
    };

    return (
        <div>
            {isSomeoneLogged ? (
                <div>
          <span>
            Welcome to the SNM dashboard{" "}
              <b>{user.username}</b>.
          </span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
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
            )}
        </div>
    );
}