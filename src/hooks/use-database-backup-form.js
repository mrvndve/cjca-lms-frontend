import { 
  useState,
  useEffect,
} from 'react';

import { 
  useForm,
} from 'react-hook-form';

import { 
  axiosUrl,
  axiosConfig,
  getUser,
} from '../utils';

import axios from 'axios';

import { 
  toast,
} from 'react-toastify';

const useDatabaseBackupForm = () => {
  const [loading, setLoading] = useState(false);

  const [backups, setBackups] = useState([]);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm();

  const fetchDatabaseBackups = async () => {
    setLoading(true);

    await axios.get(`${axiosUrl}/settings/fetch_backup`, axiosConfig)
      .then(({data}) => {
        setBackups(data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      })
  };

  const onSubmit = async (data) => {
    const apiData = {
      by_user_id: getUser().id,
      ...data,
    };

    await axios.post(`${axiosUrl}/settings/create_backup`, apiData, axiosConfig)
      .then(({data}) => {
        setLoading(false);
        toast.success(data.message);
        reset();
        fetchDatabaseBackups();
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDatabaseBackups();
  }, []);

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    backups,
    loading,
  }
};

export default useDatabaseBackupForm;