import { 
  useState,
  useEffect,
} from 'react';

import { 
  useForm,
} from 'react-hook-form';

import { 
  useParams,
} from 'react-router';

import axios from 'axios';

import {
  axiosUrl,
  axiosConfig,
  getUser,
  SocketConnect,
} from '../utils';

import { 
  toast,
} from 'react-toastify';

import { 
  isEmpty, 
} from 'lodash';

import moment from 'moment';

const useSubjectAssignQuizzesForm = ({
  isModalOpen,
  handleClose,
  handleSetAssignedQuizzes,
}) => {
  const [loading, setLoading] = useState(false);

  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  const [questions, setQuestions] = useState([]);

  const socket = SocketConnect();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const {
    id,
  } = useParams();

  const onSubmit = async (data, e) => {
    data['by_user_id'] = getUser().id;

    data['subject_id'] = id;

    data['questions'] = JSON.stringify(questions);

    if (data.passing_score > data.total_points) {
      toast.error('Passing score field must be less than total points fields.');
      return;
    }

    if (isEmpty(questions)) {
      toast.error('Please add a question.');
      return;
    }

    if (moment(data['due_date']).isBefore(moment(new Date().toDateString()))) { 
      toast.error('Due date must be today or a date in the future.');
      return;
    }

    setLoading(true);

    await axios.post(`${axiosUrl}/subject/add_quiz`, data, axiosConfig)
      .then(({data}) => {
        handleSetAssignedQuizzes(data.data);

        setLoading(false);

        toast.success(data.message);

        reset();

        const userIds = [];

        data.students.map(data => {
          userIds.push(data.id);
        });

        socket.emit("sendNotifications", {
          userIds,
          title: 'New Quiz',
          message: 'A new quiz has been added to your student account.',
          type: 'quiz',
          is_read: 0,
          created_at: new Date(),
        });

        handleClose();
      })
      .catch((err) => {
        toast.error(err.message);

        setLoading(false);
      })
  };

  const handleSetQuestions = data => {
    setQuestions(data);
  };

  const handleOpenQuestionModal = () => {
    setQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setQuestionModalOpen(false);
  }

  const handleRemoveElQuestion = (e, index) => {
    questions.splice(index, 1);
  }

  const total = (arr) => {
    let num = 0;
    
    for (let x in arr) {
      num += parseFloat(arr[x].points);
    }

    setValue('total_points', num);

    return num;
  }

  const totalPoints = total(questions);

  useEffect(() => {
    reset();
    setQuestions([]);
  }, [isModalOpen]);

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    questions,
    handleSetQuestions,
    questionModalOpen,
    handleOpenQuestionModal,
    handleCloseQuestionModal,
    handleRemoveElQuestion,
    totalPoints,
  };
};

export default useSubjectAssignQuizzesForm;