import React,{useEffect} from 'react';
import logo from '../../Images/logo.png';
import Tilt from 'react-parallax-tilt';
import { Link,useLocation,useHistory } from 'react-router-dom';
import { isAdmin, isAuth } from '../../utils/isAuth';
import { AppBar,Button, Toolbar, Typography, makeStyles } from "@material-ui/core";
import headersData from '../../routes/menu';


const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    display:'flex',
    flexDirection:'column'

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

  const history = useHistory();
  const logout = () => {
    localStorage.clear('token');
    history.push('/user/login')
  }

  const { header, logoStyle,toolbar,menuButton } = useStyles();
 
  const displayHeader = () => {
    return (
    <Toolbar className={toolbar}>
      {sdkAppLogo}
      {
        isAdmin() === 'User' ? 
        getUserMenu() :
        getAdminMenu()
      }
      {
        <Button variant="contained" color="secondary" onClick={logout}>LogOut</Button>
      }
    </Toolbar>
    )
  }

  const getUserMenu = () => {

    return headersData.filter((val) => {
      return val.permission === isAdmin()
    }).map(({label,href}) => {
      return (
        <Button {...{
          key: label,
          color:'inherit',
          to: href,
          component: Link,
          className: menuButton,
        }}
        >
          {label}
        </Button>
      )
    })
  }

  const getAdminMenu = () => {

    return headersData.map(({label,href}) => {
      return (
        <Button {...{
          key: label,
          color:'inherit',
          to: href,
          component: Link,
          className: menuButton,
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