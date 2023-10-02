import {useUser} from "./useUser";

export const useAuth = () => {
    const {addUser, removeUser, getUser} = useUser();

    const login = (user) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return {getUser, login, logout};
};