import axios from 'axios';
import {toast} from 'react-toastify';

const axiosInstance = () => {
    const APItoken = localStorage.getItem('token');
    let token;
    if(APItoken) {
        token = APItoken;
    } else {
        token = null;
    }

    const baseUrl = 'http://localhost:4004';

    const AxiosInstance = axios.create({
        baseURL:baseUrl,
        method:'post'
    })

    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    AxiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

    AxiosInstance.interceptors.request.use((request) => {
        return request;
    },error => {
        return Promise.reject(error);
    })


    AxiosInstance.interceptors.response.use(
    (response) => {
        return Promise.resolve(response);
    } ,
    (error) => {
        // client side error 
        if(!error.response) {
            return Promise.reject(error);
        }

        if(error.response.status === 403) {
              localStorage.removeItem('token');
              toast.error('Missing authorization');
              window.location = '/login';
        } else {
            return Promise.reject(error.response.data);
        }
    }
)

return AxiosInstance;
}

export default axiosInstance