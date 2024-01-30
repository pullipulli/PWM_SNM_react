import {useUser} from "./useUser.jsx";
import {useCallback} from "react";

export const useAuth = () => {
    const {addUser, removeUser, getUser, isUserStored} = useUser();

    const login = (user) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    const isLoggedIn = useCallback(() => {
        return isUserStored();
    }, [isUserStored]);

    return {getUser, login, logout, isLoggedIn};
};