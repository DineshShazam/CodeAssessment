import React,{useEffect}from 'react';
import logo from '../../Images/logo.png';
import Tilt from 'react-parallax-tilt';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { isAuth } from '../../utils/isAuth';
import { AppBar,Button, Toolbar, Typography, makeStyles } from "@material-ui/core";
import headersData from '../../routes/menu';


const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logoStyle:{
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton : {
    fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
  },
  toolbar:{
    display:'flex',
    justifyContent: 'space-between'
  }
}))

const Navbar = () => {

  const { header, logoStyle,toolbar,menuButton } = useStyles();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem('token');
    history.push('/user/login');
  },[location.pathname === '/logout'])

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   history.push('/user/login');
  // }
 

  const displayHeader = () => {
    return (
    <Toolbar className={toolbar}>
      {sdkAppLogo}
      {getMenu()}
    </Toolbar>
    )
  }

  const getMenu = () => {
    return headersData.map(({label,href}) => {
      return (
        <Button {...{
          key: label,
          color:'inherit',
          to: href,
          component: Link,
          className: menuButton
        }}
        >
          {label}
        </Button>
      )
    })
  }

  const sdkAppLogo = (
    <>
      <Typography variant="h6" component="h1" className={logoStyle}>
        SDK_DEV_MERN
    </Typography>
    </>
  );

  // <div style={{float:'right'}}>
  //           <nav onClick={logout} >
  //             <p style={{
  //               backgroundColor: '#FF5EDF',
  //               borderRadius: '10px',
  //               cursor: 'pointer',
  //               border: 'none',
  //               color: 'white',
  //               padding: '15px 32px',
  //               textAlign: 'center',
  //               textDecoration: 'none',
  //               display: 'inline-block',
  //               fontSize: '16px',
  //               marginRight: '40px',
  //               marginTop: '34px'
  //             }}>Sign Out</p>
  //           </nav>

  //           </div>

  return (
    <>
      {
        isAuth().isLogged === false ?

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div className='ma4 mt0' style={{ justifyContent: 'flex-start' }}>
              <Tilt className="Tilt br2" style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                  <img style={{ paddingTop: '5px', borderRadius: '30px' }} alt='logo' src={logo} />
                </div>
              </Tilt>
            </div>
          </div>

          :
          <AppBar className={header}>
            {displayHeader()}
          </AppBar>

      }
    </>

  )
}

export default Navbar;