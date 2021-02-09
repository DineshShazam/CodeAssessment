import jwt_decode  from 'jwt-decode'

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
    if(APItoken) {
        const decoded = jwt_decode(APItoken);
        console.log(decoded);
        const {role} = decoded;
        console.log(role);
        if(role) {
            return role;
        } else {
            return null;
        }   
    } else {
        return null;
    }
     
}