import axios from 'axios'
import config from '../config'

let instance = axios.create({
    baseURL: config.apiUrl,

});

let setToken = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
export {setToken}
