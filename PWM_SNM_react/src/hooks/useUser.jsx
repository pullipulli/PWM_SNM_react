import {useLocalStorage} from "./useLocalStorage";
import {useState} from "react";

export const useUser = () => {
    const {removeItem, setItem, getItem} = useLocalStorage();
    const [user, setUser] = useState();
    const userKey = 'user';

    const addUser = (user) => {
        setUser(user);
        setItem(userKey, JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        removeItem(userKey);
    };

    const getUser = () => {
        return JSON.parse(getItem(userKey));
    }

    return {getUser, addUser, removeUser};
};
