import {lazy} from "react";

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/auth/Login.jsx"));
const Register = lazy(() => import("../pages/auth/Register.jsx"));
const Profile = lazy(() => import( "../pages/Profile.jsx"));
const Page404 = lazy(() => import("../pages/Page404.jsx"));
const UpdateProfile = lazy(() => import("../pages/UpdateProfile.jsx"));
const UserPlaylist = lazy(() => import("../pages/playlist/UserPlaylist.jsx"));
const Playlist = lazy(() => import("../pages/playlist/Playlist.jsx"));

const routes = {
    root: {path: '/', element: <Home/>},
    login: {path: '/login', element: <Login/>},
    register: {path: '/register', element: <Register/>},
    profile: {path: '/profile', element: <Profile/>},
    updateProfile: {path: '/profile/update', element: <UpdateProfile/>},
    playlists: {path: '/playlist', element: <>TODO: Public Playlists</>},
    userPlaylist: {path: '/playlist/:user', element: <UserPlaylist/>},
    playlist: {path: '/playlist/:user/:playlistName', element: <Playlist/>},
    default: {path: '*', element: <Page404/>}
};

export const routesArray = Object.values(routes);

export default routes;
