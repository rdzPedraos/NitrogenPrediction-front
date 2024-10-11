import _axios from "axios";
const baseURL = process.env.API_URL;

const api = _axios.create({
    baseURL,
});

export default api;
