import React from 'react'
import './activation.css'
import {useLocation} from 'react-router-dom'
import { toast } from 'react-toastify';
import { activateUser } from '../../API/apiActions/auth';
import {useHistory} from 'react-router-dom';

const AccountActivation =  () => {

    const location = useLocation();
    const history = useHistory(); 
    
    const activationAccount = async () => {  
     
        const url = location.pathname;
        const urlToken = url.split("/").pop();
        const res = await activateUser({activationToken:urlToken});
        toast.success(res);
        history.push('/home');
       
    }

    return (
        <div>
      <div className="activation__wrapper">
  <div className="activation__container">
    {/* <div className="activation__header"><img className="activation__logo" alt='logo' src={logo}/></div> */}
    <div className="activation__subject">Account Activation Link</div>
    <div className="activation__arrow"></div>
    <div className="activation__message">
      <div>
      You are just , <span className="activation__user">one step away</span>

    </div>
    </div>
    <div className="activation__link">
      <div>
        Click on the following link to activate your account:
      </div>
      <div onClick={activationAccount} className="activation__btn">Activate your account</div>
    </div>
    <br/>
    <div className="activation__footer">
      Thank you. Sincerely,
      <br/> SDK Support Team
      <br/>
    </div>
  </div>
</div>

    </div>
    )
}

export default AccountActivation