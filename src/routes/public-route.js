import {
    useEffect,
  } from 'react';
  
  import {
    useNavigate
  } from 'react-router-dom';

  import { ToastContainer } from 'react-toastify';
  
  const PublicRoute = ({ children }) => {
    const navigate = useNavigate();
  
    const token = localStorage.getItem('token');

    const user = JSON.parse(localStorage.getItem('user'));
  
    useEffect(() => {
      if (token) {
        if (user.role === 'ADMIN') {
          navigate('/admin');
        } else if (user.role === 'STUDENT') {
          navigate('/student');
        } else if (user.role === 'TEACHER') {
          navigate('/teacher');
        }
      } else {
        navigate('/login');
      }
    }, [token, navigate]);
  
    return <>
      {children}

      <ToastContainer 
        style={{
          fontWeight: 'bold',
        }}
        position='top-right'
      />
    </>;
  };
  
  export default PublicRoute;