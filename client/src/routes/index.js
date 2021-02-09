import AccountActivation from '../Component/AccountActivation/accountActivation';
import Admin from '../Component/admin/admin';
import Login from '../Component/Authentication/login';
import Home from '../Component/Home/home';


const routes = [
    {
        path:'/user/login', 
        component: Login,
        title: 'Login',
        needsAuth:false
    },
    { 
        path:'/user/register',
        component:Login,
        title: 'Register',
        needsAuth:false
    },
    { 
        path:'/home',
        component:Home,
        title: 'Home',
        needsAuth:true
    },
    {
        path:'/user/activate/:token',
        component:AccountActivation,
        title: 'USer Activation',
        needsAuth:false
    },
    {
        path:'/admin/listUser',
        component:Admin,
        title:'List User',
        needsAuth:false
    }
]

export default routes