import { 
  useEffect,
  useState,
} from 'react';

import {
  adminSideBarItems,
  studentSideBarItems,
  teacherSideBarItems,
  axiosUrl, 
  axiosConfig,
  getUser,
  getStudentSubjects,
} from '../utils';

import axios from 'axios';

const useSideBar = () => {
  const [sideBarItems, setSideBarItems] = useState([]);

  const [response, setResponse] = useState([]);

  const sideBars = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      if (user.role === 'ADMIN') {
        setSideBarItems(adminSideBarItems);
      } else if (getUser().role === 'STUDENT') {
        setSideBarItems(studentSideBarItems);
        
        setResponse('test');
      } else {
        setSideBarItems(teacherSideBarItems);
      }
    }
  }

  useEffect(() => {
    sideBars();

    return () => {
      sideBars();
    };
  }, []);

  return {
    getUser,
    getStudentSubjects,
    sideBarItems,
    response,
  }
};

export default useSideBar;