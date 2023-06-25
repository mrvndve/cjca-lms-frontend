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

const useStudentAssignmentPage = () => {
  const [response, setResponse] = useState([]);

  const [isModalOpen, setIsModaOpen] = useState(false);

  const [selected, setSelected] = useState({});

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

  const toggleModal = (e, data) => {
    setSelected(data);
    setIsModaOpen(!isModalOpen);
  };

  useEffect(() => {
    fetchSubjectDetails();
  }, []);

  return {
    response,
    isModalOpen,
    selected,
    toggleModal,
    subjectTeachers,
    fetchSubjectDetails,
  };
};

export default useStudentAssignmentPage;