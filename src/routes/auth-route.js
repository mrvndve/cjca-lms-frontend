import {
  useState,
  useEffect,
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import Header from '../layout/header';
import SideBar from '../layout/side-bar';

import { 
  ToastContainer, 
} from 'react-toastify';

import {
  Box,
  CssBaseline,
} from '@mui/material';

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const user = JSON.parse(localStorage.getItem('user'));

  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      if (user.role === 'ADMIN' && !window.location.toString().includes('/admin')) {
        navigate('/admin');
      } else if (user.role === 'STUDENT' && !window.location.toString().includes('/student')) {
        navigate('/student');
      } else if (user.role === 'TEACHER' && !window.location.toString().includes('/teacher')) {
        navigate('/teacher');
      }
    }
  }, [token, navigate]);

  return <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>

      {/* Header */}
      <Header {...{
        handleDrawerToggle,
        drawerWidth,
      }}/>

      {/* SideBar */}
      <SideBar {...{ 
        handleDrawerToggle,
        mobileOpen,
        drawerWidth,
      }}/>

      {/* Container */}
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - ${drawerWidth}px)` }, pt: 10 }}
      >
        {children}
      </Box>
      
      <ToastContainer 
        style={{
          fontWeight: 'bold',
        }}
        position='top-right'
      />
    </Box>
  </>;
};

export default AuthRoute;