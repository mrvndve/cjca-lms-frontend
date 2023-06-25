import {
  useState,
  useEffect,
} from 'react';

import { 
  axiosUrl, 
  axiosConfig,
  getUser,
  SocketConnect,
} from '../utils';

import axios from 'axios';

import { 
  toast,
} from 'react-toastify';

import * as XLSX from 'xlsx';

import moment from 'moment';

import { useForm } from 'react-hook-form';

const useGradeBook = () => {
  const [data, setData] = useState([]);

  const [type, setType] = useState('exams');

  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected, setSelected] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogMessage, setDialogMessage] = useState('');

  const [dialogTitle, setDialogTitle] = useState('');

  const [allData, setAllData] = useState('');

  const accessType = type === 'exams' ? 'exam' : (type === 'quizzes' ? 'quiz' : (type === 'task_performances' ? 'task_performance' : 'assignment'));

  const socket = SocketConnect();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const fetchScores = async () => {
    setLoading(true);
    
    await axios.get(`${axiosUrl}/student/fetch_scores?user_id=${getUser().id}`, axiosConfig)
      .then(({data}) => {
        setAllData(data.data);

        var filtered =  data.data[type].filter(data => {
          return data['user']['full_name'].toLowerCase().includes(search.toLowerCase());
        })

        setData(filtered);

        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);

        setLoading(false);
      })
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    fetchScores();
  }, [search, type])

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const exportToCSV = async () => {
    const accessType = type === 'exams' ? 'exam' : (type === 'quizzes' ? 'quiz' : (type === 'task_performances' ? 'task_performance' : 'assignment'));

    const tempArr = [];

    data.map(x => {
      tempArr.push({
        ['Exam Name']: x[accessType].title,
        ['Submit Date']: `${moment(x.created_at).format('MMMM DD YYYY')}`,
        Student: x.user.full_name,
        Score: x.score,
        Status: x.status,
      })
    })

    const xlsxData = tempArr;

    const worksheet = XLSX.utils.json_to_sheet(xlsxData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${type}-scores-${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
  };

  const exportToCSVAll = async () => {
    const tempArr = [];

    const {
      exams,
      quizzes,
      assignments,
      task_performances,
    } = allData;

    const merged = exams.concat(quizzes, assignments, task_performances);

    merged.map(x => {
      tempArr.push({
        Category: x.exam ? 'Exam' : (x.quiz ? 'Quiz' : (x.assignment ? 'Assignment' : 'Task Performance')),
        Title: x.exam ? x.exam.title : (x.quiz ? x.quiz.title : (x.assignment ? x.assignment.title : x.task_performance.title)),
        ['Submit Date']: `${moment(x.created_at).format('MMMM DD YYYY')}`,
        Student: x.user.full_name,
        Score: x.score,
        Status: x.status,
      })
    })

    const xlsxData = tempArr;
    const worksheet = XLSX.utils.json_to_sheet(xlsxData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `gradebook-scores-${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
  };

  const openModal = (e, data) => {
    setIsModalOpen(true);
    setSelected(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelected({});
  }

  const onSubmit = async (data) => {
    if (parseInt(data.score) > parseInt(selected[accessType].total_points)) {
      toast.error('Score must be less than or equal to total points.');
      return;
    }
    
    const {
      id,
      user: {
        id: student_id,
      },
    } = selected;

    const status = parseInt(selected[accessType].passing_score) > parseInt(data.score) ? 'Failed' : 'Passed';

    const replacedAccessType = accessType.replace('_', ' ');

    const apiData = {
      id,
      user_id: getUser().id,
      student_id: student_id,
      type: replacedAccessType,
      status,
      ...data,
    };

    setFormLoading(true);

    await axios.post(`${axiosUrl}/student/set_score`, apiData, axiosConfig)
      .then(({data}) => {
        const userIds = [];

        userIds.push(data.student.id);

        socket.emit("sendNotifications", {
          userIds,
          title: 'Score',
          message: `Your ${replacedAccessType} has been scored.`,
          type: `set ${replacedAccessType} score`,
          is_read: 0,
          created_at: new Date(),
        });

        setFormLoading(false);
        toast.success(data.message);
        reset();
        closeModal();
        fetchScores();
      })
      .catch((err) => {
        setFormLoading(false);
        toast.error(err.message);
      })
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const retake = async () => {
    const {
      id,
      user: {
        id: student_id,
      },
    } = selected;

    const replacedAccessType = accessType.replace('_', ' ');

    const apiData = {
      id,
      user_id: getUser().id,
      student_id,
      access_id: accessType == 'quiz' ? selected?.quiz_id : (accessType == 'exam' && selected?.exam_id),
      type: replacedAccessType,
    };

    await axios.post(`${axiosUrl}/student/retake`, apiData, axiosConfig)
      .then(({data}) => {
        const userIds = [];

        userIds.push(data.student.id);

        socket.emit("sendNotifications", {
          userIds,
          title: 'Retake',
          message: `You have given a permission to retake ${replacedAccessType}`,
          type: `retake ${replacedAccessType}`,
          is_read: 0,
          created_at: new Date(),
        });

        toast.success(data.message);
        handleClose();
        fetchScores();
      })
      .catch((err) => {
        toast.error(err.message);
      })
  }

  const handleYes = () => {
    retake();
  };

  const handleOpenDialog = (e, data) => {
    setOpenDialog(true);
    setSelected(data);
    setDialogMessage(`Are you sure you want to give the student to retake this ${accessType}?`);
    setDialogTitle('Permission to retake');
  };

  return {
    data,
    type,
    accessType,
    loading,
    handleTypeChange,
    handleSearch,
    exportToCSV,
    exportToCSVAll,

    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    isModalOpen,
    openModal,
    closeModal,
    selected,
    formLoading,

    handleOpenDialog,
    handleYes,
    handleClose,
    openDialog,
    dialogMessage,
    dialogTitle,
  };
};

export default useGradeBook;