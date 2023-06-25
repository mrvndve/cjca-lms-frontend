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
  SocketConnect,
} from '../utils';

import { toast } from 'react-toastify';

const useAnnouncementsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    mode
  } = useParams();

  const {
    state
  } = useLocation();

  const navigate = useNavigate();

  const num = Math.floor(Math.random() * 90000) + 10000;

  const socket = SocketConnect();

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

    data['author_id'] = getUser().id;

    data['by_user_id'] = getUser().id;

    const apiData = data;

    setLoading(true);

    await axios.post(`${axiosUrl}/announcement/${mode === 'add' ? 'insert' : 'update'}`, apiData, axiosConfig)
      .then(({data}) => {
        apiData['is_announcement'] = 1;
        apiData['is_read'] = 0;
        apiData['message'] = apiData['content'];
        apiData['created_at'] = new Date();

        socket.emit("sendNotifications", apiData);

        setLoading(false);
        toast.success(data.message);
        reset();
        navigate(`/${getUser().role.toLowerCase()}/announcements`);
      })
      .catch((err) => {
        if (err.response.data) {
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
  }, []);

  return {
    mode,
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow: state,
  };
};

export default useAnnouncementsForm;