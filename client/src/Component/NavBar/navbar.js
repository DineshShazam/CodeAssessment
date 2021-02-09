import React from 'react';
import logo from '../../Images/logo.png';
import Tilt from 'react-parallax-tilt';
import {useHistory,useLocation} from 'react-router-dom';

const Navbar = () => {

  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem('token');
    history.push('/user/login');
  }
  console.log(location.pathname);

     return (
        <div style={{display:'flex',justifyContent:'space-between'}}>

        <div className='ma4 mt0' style={{justifyContent:'flex-start'}}>
          <Tilt className="Tilt br2" style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3">
              <img style={{paddingTop: '5px', borderRadius: '30px'}} alt='logo' src={logo}/>
            </div>
          </Tilt>
        </div>

        <nav onClick={logout} >
            <p style={{
                 backgroundColor: '#FF5EDF',
                 borderRadius: '10px',
                 cursor: 'pointer',
                 border: 'none',
                 color: 'white',
                 padding: '15px 32px',
                 textAlign: 'center',
                 textDecoration: 'none',
                 display: 'inline-block',
                 fontSize: '16px',
                 marginRight: '40px',
                 marginTop: '34px'
            }}>Sign Out</p>


        </nav>
        </div>
    )
}

export default Navbar;