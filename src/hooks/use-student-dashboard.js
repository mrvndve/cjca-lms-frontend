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

const useStudentDashboard = () => {
  const [response, setResponse] = useState([]);

  const fetchStudentDashboard = async () => {
    await axios.get(`${axiosUrl}/dashboard/fetch_student_dashboard?user_id=${getUser().id}`, axiosConfig)
      .then(({data}) => {
        setResponse(data.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  };

  const subjectTeachers = arr => {
    const tempArr = [];

    arr.map((data) => {
      tempArr.push(data.name);
    })

    return tempArr.toString().trim();
  };

  useEffect(() => {
    fetchStudentDashboard();
  }, [])

  return {
    response,
    subjectTeachers,
  }
};

export default useStudentDashboard;