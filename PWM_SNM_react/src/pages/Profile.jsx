import {useAuth} from "../hooks/useAuth.js";

export default function Profile() {
    const {getUser} = useAuth();
    return <div>Profile of {getUser().username}</div>
}
