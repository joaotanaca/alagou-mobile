import axios from "axios";
import Constants from "expo-constants";

const location = axios.create({
    baseURL: `https://us1.locationiq.com/v1/`,
    params: {
        key: Constants.manifest.extra.API_KEY,
    },
});

export default location;
