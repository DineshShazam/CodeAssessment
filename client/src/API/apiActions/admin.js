import { toast } from "react-toastify";
import axios from "../endPoint/node.endPoint"


export const listUsers = async () => {
    try {
        const res = await axios().get('/admin/listUsers');
        return res.data;
    } catch (error) {
        toast.error(error);
        return;
    }
}

export const updateStatus = async (value) => {
    try {
        const res = await axios().put('/admin/isActive',value);
        return res.data;
    } catch (error) {
        toast.error(error);
        return;
    }
}

export const updateRoleAPI = async (value) => {
    console.log(value);
    try {
        const res = await axios().put('/admin/updateRole',value);
        return res.data;
    } catch (error) {
        toast.error(error);
        return;
    }
}
