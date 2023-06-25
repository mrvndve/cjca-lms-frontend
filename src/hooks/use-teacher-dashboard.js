import {
  useEffect,
  useState,
} from 'react';

import { 
  axiosUrl, 
  axiosConfig,
  getUser,
} from '../utils';

import axios from 'axios';

import { toast } from 'react-toastify';

const useTeacherDashboard = () => {
  const [response, setResponse] = useState([]);
  
  const fetchTeacherDashboard = async () => {
    await axios.get(`${axiosUrl}/dashboard/fetch_teacher_dashboard?user_id=${getUser().id}`, axiosConfig)
    .then(({data}) => {
      setResponse(data.data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  };

  useEffect(() => {
    fetchTeacherDashboard();
  }, []);

  return {
    response,
  };
};

export default useTeacherDashboard;