import axios from 'axios';

export const chronometer = axios.create({
    baseURL: 'https://api.pushly.com/chronometer',
})