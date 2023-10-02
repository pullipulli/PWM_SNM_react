import {useLocalStorage} from "./useLocalStorage";
import {useState} from "react";

export const useUser = () => {
    const [user, setUser] = useState();
    const {removeItem, setItem} = useLocalStorage();

    const addUser = (user) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        removeItem("user");
    };

    return {user, addUser, removeUser};
};
