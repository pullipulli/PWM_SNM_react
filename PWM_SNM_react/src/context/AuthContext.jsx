import {createContext, useContext} from "react";

export const AuthContext = createContext({
    getUser: () => {
    },
    login: (user) => {
        return user;
    },
    logout: () => {
    },
    isLoggedIn: () => {
        return false;
    },
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}