import React,{useEffect} from 'react'
import './App.css';
import {ToastContainer,Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Route,Switch,useHistory,Redirect,withRouter} from 'react-router-dom';
import routes from './routes';
import {isAdmin, isAuth} from './utils/isAuth';
import Navbar from './Component/NavBar/navbar';

const RenderRoute = ({role,...route}) => {
  const history = useHistory();

  if(route.needsAuth && !isAuth()) {
   history.push('/user/login');
  }

  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} />}
    ></Route>
  )

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
          routes?.map((route,index) => (
              <RenderRoute {...route} key={index} />
          ))
        }
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
