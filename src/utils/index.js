import {
  axiosUrl,
  axiosConfig,
  apiDomain,
  socketServer,
} from './constants';

import {
  adminSideBarItems,
  studentSideBarItems,
  teacherSideBarItems,
} from './side-bar-items';

import { 
  numbersOnly,
  emailOnly,
} from './regex';

import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  ERROR_COLOR,
} from './colors';

import { 
  SocketConnect, 
} from './socket';

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user : {};
};

const getStudentSubjects = () => {
  const subjects = JSON.parse(localStorage.getItem('subjects'));
  return subjects ? subjects : {};
};

const randomNum = Math.floor(Math.random() * 90000) + 10000;

export {
  axiosUrl,
  axiosConfig,
  apiDomain,
  socketServer,

  adminSideBarItems,
  studentSideBarItems,
  teacherSideBarItems,

  numbersOnly,
  emailOnly,

  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  ERROR_COLOR,

  getUser,
  getStudentSubjects,
  randomNum,

  SocketConnect,
};