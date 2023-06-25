import {
  useState,
  useEffect,
} from 'react';

import { 
  axiosUrl, 
  axiosConfig,
  getUser,
} from '../utils';

import axios from 'axios';

const useStudentQuizzesPage = () => {
  const [response, setResponse] = useState([]);

  const fetchSubjectDetails = async () => {
    await axios.get(`${axiosUrl}/student/fetch_data?user_id=${getUser().id}`, axiosConfig)
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
    fetchSubjectDetails();
  }, []);

  return {
    response,
    subjectTeachers,
  };
};

export default useStudentQuizzesPage;