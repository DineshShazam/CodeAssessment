import AccountActivation from '../Component/AccountActivation/accountActivation';
import Admin from '../Component/admin/admin';
import AdminRegister from '../Component/admin/adminRegister';
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
        path:'/user/activate/:token',
        component: AccountActivation,
        title: 'USer Activation',
        needsAuth:false
    },
    { 
        path:'/home',
        component:Home,
        title: 'Home',
        role:'User',
        needsAuth:true
    },
    {
        path:'/admin/listUser',
        component:Admin,
        title:'List User',
        role:'Admin',
        needsAuth:true
    },
    {
        path:'/admin/register',
        component:AdminRegister,
        title:'Register Admin',
        role:'Admin',
        needsAuth:true
    }
]

export default routes