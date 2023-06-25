import {
  useEffect,
  useState,
} from 'react';

import { 
  useNavigate, 
} from 'react-router';

import axios from 'axios';

import {
  axiosConfig,
  axiosUrl,
  getUser,
  SocketConnect,
} from '../utils';

import {
  orderBy,
} from 'lodash';

import { 
  toast,
} from 'react-toastify';

const useHeader = () => {  
  const [openDialog, setOpenDialog] = useState(false);

  const [response, setResponse] = useState([]);

  const [notificationMenuAnchor, setMenuNotificationAnchor] = useState(null);

  const isNotificationsOpen = Boolean(notificationMenuAnchor);

  const navigate = useNavigate();

  const socket = SocketConnect();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleClose = () => {
    setOpenDialog(!openDialog);
  };

  const handleYes = () => {
    logout();
  };

  const handleOpenNotifications = (e) => {
    setMenuNotificationAnchor(e.currentTarget);
    updateNotifications();
  };

  const handleCloseNotifications = () => {
    setMenuNotificationAnchor(null);
  };

  const handleNotificationsRedirect = (e, selected) => {
    if (getUser().role === 'STUDENT') {
      if (selected.type === 'announcement') {
        navigate('/student/announcements');
      } else if (selected.type === 'exam' || selected.type === 'retake exam' || selected.type === 'set exam score') {
        navigate('/student/exams');
      } else if (selected.type === 'quiz' || selected.type === 'retake quiz' || selected.type === 'set quiz score') {
        navigate('/student/quizzes');
      } else if (selected.type === 'assignment' || selected.type === 'retake assignment' || selected.type === 'set assignment score') {
        navigate('/student/assignments');
      } else if (selected.type === 'task performance' || selected.type === 'retake task performance' || selected.type === 'set task performance score') {
        navigate('/student/task-performances');
      } else {
        navigate('/student');
      }  
    }

    if (getUser().role === 'TEACHER') {
      if (selected.type === 'teacher new subject') {
        navigate('/teacher/subjects');
      } else if (selected.type === 'teacher assignment' || selected.type === 'teacher exam' || selected.type === 'teacher quiz' || selected.type === 'teacher task performance') {
        navigate('/teacher/grade-book');
      } 
      else {
        navigate('/teacher');
      }
    }

    handleCloseNotifications(null);
  }

  const fetchNotifications = async () => {
    await axios.get(`${axiosUrl}/users/fetch_notifications?user_id=${getUser().id}`, axiosConfig)
      .then(({data}) => {
        setResponse(data.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  
  const updateNotifications = async () => {
    const data = {
      user_id: getUser().id,
    };

    await axios.post(`${axiosUrl}/users/update_notifications`, data, axiosConfig)
      .then(({data}) => {
        setResponse(data.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const unreadNotifications = response.filter(data => data.is_read == 0).length;

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (getUser().role === 'STUDENT') {
      socket.on("receiveNotifications", data => {
        if (data.hasOwnProperty('userIds')) { 
          if (data.userIds.includes(getUser().id)) {
            setResponse(prev => [...prev, data]);
            toast.info('You have new notification!');
          }
        } else {
          setResponse(prev => [...prev, data]);
          toast.info('You have new notification!');
        }
      });
    }

    if (getUser().role === "TEACHER") {
      socket.on("receiveNotifications2", data => {
        console.log(data);
        if (data.hasOwnProperty('teacherIds')) { 
          if (data.teacherIds.includes(getUser().id)) {
            setResponse(prev => [...prev, data]);
            toast.info('You have new notification!');
          }
        } else {
          setResponse(prev => [...prev, data]);
          toast.info('You have new notification!');
        }
      })
    }
  }, [socket]);

  return {
    handleOpenDialog,
    handleClose,
    handleYes,
    openDialog,
    response: orderBy(response, ['id'], ['desc']),
    unreadNotifications,
    handleOpenNotifications,
    handleCloseNotifications,
    handleNotificationsRedirect,
    notificationMenuAnchor,
    isNotificationsOpen,
  };
};

export default useHeader;