import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-newburger.firebaseio.com'
});

export default instance;