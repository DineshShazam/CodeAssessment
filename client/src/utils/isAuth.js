import jwt from 'jsonwebtoken'

export const isAuth = () => {
    const APItoken = localStorage.getItem('token');
    if(APItoken) {
        return {
            APItoken,
            isLogged:true
        };
    } else {
        return {
            APItoken:null,
            isLogged:false
        };
    }
}

export const isAdmin = () => {
    const APItoken = localStorage.getItem('token');
    const decoded = jwt.decode(APItoken);
    const {role} = decoded;
    if(role) {
        return role;
    } else {
        return "";
    }    
}