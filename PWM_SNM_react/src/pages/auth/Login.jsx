import axios, {endpoints} from "../../utils/axios.js";
import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Button, Divider, Stack} from "@mui/material";
import RHFTextField from "../../components/RHFTextField.jsx";
import {useAuth} from "../../hooks/useAuth.js";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";

export default function Login() {
    const [error, setError] = useState(false);
    const {login, logout, user} = useAuth();
    const {getItem} = useLocalStorage();
    const [myUser, setMyUser] = useState(JSON.parse(getItem('user')));

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
            setMyUser(JSON.parse(getItem('user')));
            setError(false);
            methods.reset();
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    const handleLogout = async (e) => {
        logout();
        setMyUser(null);
    };

    return (
        <div>
            {myUser ? (
                <div>
          <span>
            Welcome to the SNM dashboard{" "}
              <b>{myUser.username}</b>.
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