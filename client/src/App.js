import React,{useEffect} from 'react'
import './App.css';
import {ToastContainer,Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Route,Switch,useHistory,Redirect,withRouter} from 'react-router-dom';
import routes from './routes';
import {isAdmin, isAuth} from './utils/isAuth';
import Navbar from './Component/NavBar/navbar';
import NotFound from './Component/NotFound/NotFound';


const RenderRoute = ({...route}) => {
  const history = useHistory();
  console.log('private method called')
  if(route.needsAuth && !isAuth().isLogged) {
   history.push('/user/login');
   return (
     <div></div>
   )
  } else {
    return (
      <Route
        path={route.path}
        exact
        render={(props) => <route.component {...props} />}
      ></Route>
    )
  }

 

}

const AdminRoute = ({role,...route}) => {
  const history = useHistory();
  if(route.needsAuth && !isAuth().isLogged && (isAdmin() === 'User' || isAdmin() === null)) {
   history.push('/user/login');
   return (
     <div></div>
   )
  } else if(route.needsAuth && isAuth().isLogged && isAdmin() === 'Admin') {
    console.log(isAdmin());
    return (
      <Route
        path={route.path}
        exact
        render={(props) => <route.component {...props} />}
      ></Route>
    )
  }
}

function App({history}) {

  useEffect(() => {
    window.addEventListener("popstate", () => {
      history.go(1);
    });
  },[])

  return (
    <div className="App">
     
        <Navbar/>
  
      <Switch> 
        <Redirect exact from='/' to='/user/login' />
              {
              routes?.filter((val) => {
                return val.role !== 'Admin'
              }).map((route,index) => (
                <RenderRoute {...route} key={index} />
              ))
              }
          
          
              {
                routes?.filter((val) => {
                  return val.role !== 'User'
                }).map((route,index) => (
                  <AdminRoute {...route} key={index} />
                ))
              }
      
        <Route component={NotFound} />
      </Switch>


      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      transition={Flip}
      />
    </div>
  );
}

export default withRouter(App);
