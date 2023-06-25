import {
  useState,
  useEffect,
} from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useParams,
  useLocation,
} from 'react-router';

import axios from 'axios';

import {
  axiosUrl,
  axiosConfig,
  getUser,
} from '../utils';

import { toast } from 'react-toastify';

const useStrandCoursesForm = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const {
    mode
  } = useParams();

  const {
    state
  } = useLocation();

  const navigate = useNavigate();

  const num = Math.floor(Math.random() * 90000) + 10000;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  
  const onSubmit = async (data, e) => {
    if (mode !== 'add') {
      data['id'] = state.id;
    }

    data['by_user_id'] = getUser().id;

    setLoading(true);

    await axios.post(`${axiosUrl}/strand_course/${mode === 'add' ? 'insert' : 'update'}`, data, axiosConfig)
      .then(({data}) => {
        setResponse(data);

        setLoading(false);

        toast.success(data.message);

        reset();

        navigate('/admin/strand-courses');
      })
      .catch((err) => {
        if (err.response.data) {
          setResponse(err.response.data);

          if (err.response.data.validation_errors) {
            Object.entries(err.response.data.validation_errors).forEach(([key, value]) => toast.error(value));
          }
        } else {
          toast.error(err.message);
        }

        setLoading(false);
      })
  };

  // Did Mount
  useEffect(() => {
    if (mode === 'add') {
      setValue('code', `SS-${num}`);
    }
  }, []);

  return {
    mode,
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    response,
    selectedRow: state,
  };
};

export default useStrandCoursesForm;