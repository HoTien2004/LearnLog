import axios from "axios";

const SetAuthToken = (token) => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default SetAuthToken;