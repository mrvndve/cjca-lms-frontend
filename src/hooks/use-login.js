import { 
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import { useForm } from 'react-hook-form';

import { 
  useNavigate,
} from 'react-router';

import {
  axiosConfig,
  axiosUrl,
} from '../utils';

import { toast } from 'react-toastify';

const useLogin = () => {
  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(null);

  const [response, setResponse] = useState(null);

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!isForgotPassword) {
      setLoading(true);

      await axios.post(`${axiosUrl}/login`, data, axiosConfig)
        .then(({data}) => {
          setUser(data.data);

          setToken(data.token);

          localStorage.setItem('token', data.token);
          
          localStorage.setItem('user', JSON.stringify(data.data));

          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response?.data.message);

          setLoading(false);
        })
    } else {
      setLoading(true);
      
      await axios.post(`${axiosUrl}/users/forgot_password`, { email: data['recovery_email'] }, axiosConfig)
        .then(({data}) => {
          toast.success(data.message);

          setLoading(false);
        
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response?.data.message);

          setLoading(false);
        })
    }
  };

  const toggleIsForgotPassword = () => {
    setValue('email', '');
    setValue('password', '');
    setValue('recover_email', '');

    setIsForgotPassword(!isForgotPassword);
  };

  useEffect(() => {
    if (token) {
      navigate(`/${user.role === 'ADMIN' ? 'admin' : (user.role === 'STUDENT' ? 'student' : 'teacher')}`)

      window.location.reload();
    }
  }, [token])

  return {
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    isForgotPassword,
    toggleIsForgotPassword,
    loading,
    message: response?.message,
    status: response?.status,
  }
}

export default useLogin;