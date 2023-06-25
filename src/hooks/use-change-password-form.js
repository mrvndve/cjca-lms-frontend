import { 
  useState 
} from 'react';

import { useForm } from 'react-hook-form';

import { 
  axiosUrl,
  axiosConfig,
  getUser,
} from '../utils';

import axios from 'axios';

import { toast } from 'react-toastify';

const useChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data['id'] = getUser().id;

    data['by_user_id'] = getUser().id;

    setLoading(true);

    await axios.post(`${axiosUrl}/settings/change_password`, data, axiosConfig)
      .then(({data}) => {
        setResponse(data);

        setLoading(false);

        toast.success(data.message);

        reset();
      })
      .catch((err) => {
        setResponse(err.response?.data);

        setLoading(false);
      })
  };

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    response,
  };
};

export default useChangePasswordForm;