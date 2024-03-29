import axios from "axios";

export const API_URL = "http://localhost:3100/api";

const myAxios = axios.create({
    baseURL: API_URL
});

export const endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    users: '/users',
    artists: '/artists',
    genres: '/genres',
    songs: '/songs',
    playlists: '/playlist',
    publicPlaylists: '/publicPlaylists'
};


export default myAxios;