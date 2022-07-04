import axios from 'axios';

export const api = axios.create({
    baseURL: '/api',
});

export const apiSSR = axios.create();

export const apiUpload = axios.create({
    baseURL: '/api',
    headers: {'content-type': 'multipart/form-data'},
    onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    },
});