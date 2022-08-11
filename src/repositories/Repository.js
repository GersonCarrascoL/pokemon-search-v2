import axios from 'axios';

const baseDomain = process.env.VUE_APP_URL_SERVICE;
const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL,
});
