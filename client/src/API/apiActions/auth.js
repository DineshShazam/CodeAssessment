import axios from '../endPoint/node.endPoint';
import {toast} from 'react-toastify';

export const registerAPI = async (value) => {
    try {
        const res = await axios().post('/user/register',value);
       return res.data;
    } catch (error) {
        toast.error(error);
        return;
    }
}

export const loginAPI = async (value) => {
    try {
        const res = await axios().post('/user/login',value);
        console.log(res.data.value);
        const {apiToken} = res.data.value
         if(apiToken) {
             localStorage.setItem('token', apiToken);
             return res.data;
         } else {
             toast.error('Missing Token');
             return;
         }
    } catch (error) {
        toast.error(error);
        return;
    }
}

export const activateUser = async (value) => {
    try {
        const res = await axios().post('/user/activate',value);
        console.log(res.data);
        const {message,token} = res.data;
        if(token) {
            localStorage.setItem('token', token);
            return res.data;
        }
        return message
    } catch (error) {
        console.log(error);
        toast.error(error);
        return;
    }
}