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
        const {message,value:{userToken}} = res.data;
        if(userToken) {
            localStorage.setItem('token',userToken);
            return message;
        }
        return message
    } catch (error) {
        toast.error(error);
        return;
    }
}