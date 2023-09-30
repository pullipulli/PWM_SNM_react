import axios from "../utils/axios.js";
import {useEffect, useState} from "react";

export default function Login() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isSomeoneLogged, setIsSomeoneLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/login", {username, password});
            setIsSomeoneLogged(true);
            setUser(res.data);
            setError(false);
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
                    <form onSubmit={handleSubmit}>
                        <span>Lama Login</span>
                        <input
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">
                            Login
                        </button>
                    </form>
                    {error && <div>Username o password errati</div>}
                </div>
            )}
        </div>
    );
}