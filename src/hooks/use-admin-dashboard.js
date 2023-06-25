import {
  useEffect,
  useState,
} from 'react';

import { 
  axiosUrl, 
  axiosConfig,
} from '../utils';

import axios from 'axios';

const useAdminDashboard = () => {
  const [response, setResponse] = useState([]);
  
  const fetchAdminDashboard = async () => {
    await axios.get(`${axiosUrl}/dashboard/fetch_admin_dashboard`, axiosConfig)
    .then(({data}) => {
      setResponse(data.data);
    })
    .catch((err) => {
      console.log(err.message)
    })
  };

  useEffect(() => {
    fetchAdminDashboard();
    console.log(new Date());
  }, []);

  return {
    response,
  };
};

export default useAdminDashboard;