import {
  useState,
  useEffect,
} from 'react';

import {
  useNavigate,
  useLocation, 
} from 'react-router';

import { useForm } from 'react-hook-form';

import {
  axiosConfig,
  axiosUrl,
  getUser,
  SocketConnect,
} from '../utils';

import axios from 'axios';

import { 
  isEmpty,
  shuffle, 
} from 'lodash';

import { 
  toast,
} from 'react-toastify';

const useStudentQuizzesFormPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [dialogTitle, setDialogTitle] = useState('');

  const [dialogMessage, setDialogMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [countDown, setCountDown] = useState(0);

  const [runTimer, setRunTimer] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const {
    state: selectedRow,
  } = useLocation();

  const socket = SocketConnect();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const onSubmit = async () => {
    handleSubmitQuiz();
  };

  const submitQuiz = async () => {
    let score = 0;

    var submitData = getValues();

    if (!isEmpty(submitData)) {
      Object.keys(submitData).forEach(key => {
        let index = parseInt(key.replace('answer_', '')) - 1;
  
        if (questions[index]['correct_answer'].toLowerCase().trim() == submitData[key]) {
          score += parseInt(questions[index]['points'])
        }
      });
    }

    const {
      passing_score,
      id: quiz_id,
    } = selectedRow;

    const {
      id: user_id,
      full_name,
    } = getUser();

    const teacherIds = [];

    selectedRow?.teachers.map(data => {
      teacherIds.push(data.id);
    });

    const apiData = {
      user: full_name,
      teacher_ids: JSON.stringify(teacherIds),
      quiz_id,
      user_id,
      score: score,
      status: passing_score > score ? 'Failed' : 'Passed',
    }

    setLoading(true);

    await axios.post(`${axiosUrl}/student/submit_quiz`, apiData, axiosConfig)
      .then(({data}) => {
        socket.emit("sendNotifications2", {
          teacherIds,
          title: 'Quiz',
          message: `${apiData.user} submitted a quiz.`,
          type: 'teacher quiz',
          is_read: 0,
          created_at: new Date(),
        });

        setIsSubmitted(true);
        toast.success(data.message); 
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      })
  };

  const handleSubmitQuiz = () => {
    setDialogTitle('Submit Quiz');
    setDialogMessage('Are you sure you want to submit your answers to your quiz?');
    setOpenDialog(true);
  };

  const handleYes = () => {
    submitQuiz();
  };

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleExitQuiz = () => {
    setDialogTitle('Exit Quiz?');
    setDialogMessage('Are you sure you want to submit your quiz without finishing it?');
    setOpenDialog(true);
  }

  useEffect(() => {
    setRunTimer(true);
    setQuestions(shuffle(JSON.parse(selectedRow.questions)));
  }, []);

  useEffect(() => {
    let timerId;

    if (runTimer) {
      const quiz = JSON.parse(localStorage.getItem('quiz'));

      setCountDown(quiz?.countDown ? parseInt(quiz?.countDown) : 60 * selectedRow.minutes);
      
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown != 0) {
      localStorage.setItem('quiz', JSON.stringify({
        selectedRow,
        countDown,
      }));
    }

    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
      submitQuiz();
    }
  }, [countDown, runTimer]);
  
  useEffect(() => {
    if (isSubmitted) {
      reset();
      localStorage.removeItem('quiz');
      navigate(`/student/quizzes`);
    }

    return () => {
      if (!isSubmitted)  {
        navigate(`/student/quizzes/take-quiz`, { state: selectedRow });
      }
    };
  }, [isSubmitted]);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  return {
    openDialog,
    dialogMessage,
    dialogTitle,
    handleClose,
    handleYes,
    handleExitQuiz,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    selectedRow,
    questions,
    loading,
    seconds,
    minutes,
  }
};

export default useStudentQuizzesFormPage;