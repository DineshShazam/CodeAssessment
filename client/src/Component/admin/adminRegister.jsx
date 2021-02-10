import React from 'react'
import { toast } from 'react-toastify'
import {useForm} from 'react-hook-form'
import useLoader from '../../customHook/loadingHook'
import { registerAPI } from '../../API/apiActions/auth'

export default function AdminRegister() {

    const [loading,showLoading,hideLoading] = useLoader();
    const { register, handleSubmit, errors,reset } = useForm();

    const onRegister = async (data,e) => {
        e.preventDefault();
          showLoading();
          data.role = 'Admin'
          const res = await registerAPI(data);
          if (!res) { hideLoading(); return }
          hideLoading();
          reset();
          toast.success(res.message);
      }

    return (
        <div style={{marginTop:'200px'}}>
             <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img className="lockImage" src="https://images.vexels.com/media/users/3/131263/isolated/preview/af6816ec67ec51da6b275a4aa08d236c-lock-circle-icon-by-vexels.png" id="icon" alt="User Icon" />
          </div>


          {

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
        </div>
    )
}
