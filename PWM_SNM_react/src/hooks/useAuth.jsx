import {useUser} from "./useUser";
import {useBoolean} from "./useBoolean.jsx";
import {useCallback} from "react";

export const useAuth = () => {
    const {addUser, removeUser, getUser} = useUser();
    const isLogged = useBoolean(false);

    const login = (user) => {
        addUser(user);
        isLogged.setTrue();
    };

    const logout = () => {
        removeUser();
        isLogged.setFalse();
    };

    const isLoggedIn = useCallback(() => {
        return isLogged.value;
    }, [isLogged.value]);

    return {getUser, login, logout, isLoggedIn};
};