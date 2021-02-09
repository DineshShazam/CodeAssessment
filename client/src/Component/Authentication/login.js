import React from 'react'
import './login.scss'
import Particles from 'react-particles-js';
import { NavLink, withRouter, useHistory } from 'react-router-dom'
import { loginAPI,registerAPI } from '../../API/apiActions/auth'
import { toast } from 'react-toastify'
import {useForm} from 'react-hook-form'
import useLoader from '../../customHook/loadingHook'


const Login = ({location}) => {

    const particlesOptions = {
        particles: {
          number: {
            value: 70,
            density: {
              enable: true,
              value_area: 800
            }
          }
        }
      }

    const history = useHistory();
    const [loading,showLoading,hideLoading] = useLoader();
    const { register, handleSubmit, errors,reset } = useForm();

    const onRegister = async (data,e) => {
      e.preventDefault();
        showLoading();
        location.pathname === '/user/register' ? data.role = 'User' 
        : location.pathname === '/admin/register' ? data.role = 'Admin' 
        : data.role = 'User'
        const res = await registerAPI(data);
        if (!res) { hideLoading(); return }
        hideLoading();
        reset();
        toast.success(res.message);
        history.push('/home');
    }

    const onLogin = async (data,e) => {
      e.preventDefault();
        showLoading();
        const res = await loginAPI(data);
        if (!res) { hideLoading(); return }
        hideLoading();
        reset();
        toast.success(res.message);
        history.push('/home');
    }

    return (
    <>
      <Particles params={particlesOptions} className='particles'/>
           <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className='navhead'>
            <NavLink exact to='/user/login' activeClassName='navbar--active' className="active1"> Sign In </NavLink>
            <NavLink exact to='/user/register' activeClassName='navbar--active' className="active1">Sign Up </NavLink>
          </div>
          <br />
          <div className="fadeIn first">
            <img className="lockImage" src="https://images.vexels.com/media/users/3/131263/isolated/preview/af6816ec67ec51da6b275a4aa08d236c-lock-circle-icon-by-vexels.png" id="icon" alt="User Icon" />
          </div>


          {
            location.pathname === '/user/login' ?
              <form onSubmit={handleSubmit(onLogin)}>
                <input type="text" id="login" className="fadeIn second"  name="email" ref={register({
                  required: {
                    value:true,
                    message:'Email Must!'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "*Invalid email address"
                  }
                }
                )} placeholder="email" />
                {/* displaying error message */}
                {
                  errors.email && <div className='validationBox'>{errors.email.message}</div>
                }

                <input type="password" id="password" className="fadeIn third" name="password" ref={register({ required: { value: true, message: 'Password Must' } })} placeholder="password" />
                {
                  errors.password && <div className='validationBox'>{errors.password.message}</div>
                }
                <br/>
                <input type='submit' className="fadeIn button-space" value='LOGIN' />
              </form>
              :
              <form onSubmit={handleSubmit(onRegister)}>
                <input type="text" id="login" className="fadeIn second" name="userName" ref={register({ required: true })} placeholder="username" />
                {
                  errors.username && <div className='validationBox'>Please Enter UserName</div>
                }
                <input type="password" id="password" className="fadeIn third" name="password" ref={register({ required: true })} placeholder="password" />
                {
                  errors.password && <div className='validationBox'>'Please Enter Password</div>
                }
                <input type="email" id="password" className="fadeIn" name="email" ref={register({
                  required: {
                    value: true,
                    message: 'Please Enter Email'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })} placeholder="e-mail" />
                {
                  errors.email && <div className='validationBox'>{errors.email.message}</div>
                }
                <br/>
                <input type='submit' className="fadeIn button-space" value='REGISTER' />
              </form>


          }

        </div>
      </div>
      {loading} 
    </>
    )
}

export default withRouter(Login);