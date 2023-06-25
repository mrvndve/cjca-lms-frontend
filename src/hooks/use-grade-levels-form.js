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

const useGradeLevelsForm = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const {
    mode
  } = useParams();

  const {
    state
  } = useLocation();

  const num = Math.floor(Math.random() * 90000) + 10000;

  const navigate = useNavigate();

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

    data['is_senior_high'] = data['is_senior_high'] ? 1 : 0;

    setLoading(true);

    await axios.post(`${axiosUrl}/grade_level/${mode === 'add' ? 'insert' : 'update'}`, data, axiosConfig)
      .then(({data}) => {
        setResponse(data);

        setLoading(false);

        toast.success(data.message);

        reset();

        navigate('/admin/grade-levels');
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
      setValue('code', `GL-${num}`);
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

export default useGradeLevelsForm;