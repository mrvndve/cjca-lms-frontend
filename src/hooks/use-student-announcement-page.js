import {
  useEffect,
  useState,
} from 'react';

import {
  axiosConfig,
  axiosUrl,
} from '../utils';

import axios from 'axios';

import {
  toast,
} from 'react-toastify';

const useStudentAnnouncementPage = () => {
  const [response, setResponse] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);

    await axios.get(`${axiosUrl}/announcement/fetch`, axiosConfig)
      .then(({data}) => {
        setResponse(data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    response,
    loading,
  }
};

export default useStudentAnnouncementPage;