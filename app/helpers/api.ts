import _axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
const api = _axios.create({
    baseURL,
});

export default api;
