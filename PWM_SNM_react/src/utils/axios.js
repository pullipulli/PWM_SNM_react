import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:3100/api'
});

export default myAxios;