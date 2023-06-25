import { 
  useState,
  useEffect,
} from 'react';

import { 
  useParams,
} from 'react-router';

import { toast } from 'react-toastify';

import axios from 'axios';

import { 
  axiosConfig, 
  axiosUrl,
  getUser,
} from '../utils';

const useSubjectAssignments = () => {
  const {
    id,
  } = useParams();

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogTitle, setDialogTitle] = useState('');

  const [dialogMessage, setDialogMessage] = useState('');

  const [dialogMode, setDialogMode] = useState('');

  const [lessons, setLessons] = useState([]);

  const [assignments, setAssignments] = useState([]);

  const [teachers, setTeachers] = useState([]);

  const [exams, setExams] = useState([]);

  const [quizzes, setQuizzes] = useState([]);

  const [taskPerformances, setTaskPerformances] = useState([]);

  const [teacherModalOpen, setTeacherModalOpen] = useState(false);

  const [lessonModalOpen, setLessonModalOpen] = useState(false);

  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);

  const [examModalOpen, setExamModalOpen] = useState(false);
  
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  const [taskPerformanceModalOpen, setTaskPerformanceModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedData, setSelectedData] = useState({});

  const fetchSubjectDetails = async () => {
    setLoading(true);

    await axios.get(`${axiosUrl}/subject/fetch_subject_details?subject_id=${id}`, axiosConfig)
      .then(({data}) => {
        setTeachers(data.data?.teachers);

        setLessons(data.data?.lessons);

        setAssignments(data.data?.assignments);

        setExams(data.data?.exams);

        setQuizzes(data.data?.quizzes);

        setTaskPerformances(data.data?.task_performances);

        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);

        setLoading(false);
      })
  }

  const handleAddTeacher = (e) => {
    setTeacherModalOpen(true);
  };
  
  const handleAddLesson = (e) => {
    setLessonModalOpen(true);
  };

  const handleAddAssignment = (e) => {
    setAssignmentModalOpen(true);
  };

  const handleAddExam = (e) => {
    setExamModalOpen(true);
  };

  const handleAddQuiz = (e) => {
    setQuizModalOpen(true);
  };

  const handleAddTaskPerformance = (e) => {
    setTaskPerformanceModalOpen(true);
  };

  const handleSetAssignedTeachers = data => {
    setTeachers(data);
  };

  const handleSetAssignedLessons = data => {
    setLessons(data);
  };

  const handleSetAssignedAssignments = data => {
    setAssignments(data);
  };

  const handleSetAssignedExams = data => {
    setExams(data);
  };

  const handleSetAssignedQuizzes = data => {
    setQuizzes(data);
  };

  const handleSetAssignedTaskPerformances = data => {
    setTaskPerformances(data)
  };

  const handleCloseTeacherModal = () => {
    setTeacherModalOpen(false);
  };

  const handleCloseLessonModal = () => {
    setLessonModalOpen(false);
  };

  const handleCloseAssignmentModal = () => {
    setAssignmentModalOpen(false);
  };

  const handleCloseExamModal = () => {
    setExamModalOpen(false);
  };

  const handleCloseQuizModal = () => {
    setQuizModalOpen(false);
  };

  const handleCloseTaskPerformanceModal = () => {
    setTaskPerformanceModalOpen(false);
  }

  const toggleConfirmationDialog = (title, message, mode, data) => {
    setOpenDialog(!openDialog);
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogMode(mode);
    setSelectedData(data);
  };

  const deleteTeacher = async () => {
    setLoading(true);

    const data = {
      by_user_id: getUser().id,
      id: selectedData.id,
      subject_id: selectedData.subject_id,
      user_id: selectedData.user_id,
    };

    await axios.post(`${axiosUrl}/subject/delete_teacher`, data, axiosConfig)
      .then(({data}) => {
        setTeachers(data.data);
        
        setLoading(false);

        toast.success(data.message);
      })
      .catch((err) => {
        setLoading(false);

        toast.error(err.response?.data.message);
      })
  };

  const deleteLesson = async () => {
    setLoading(true);

    const data = {
      by_user_id: getUser().id,
      id: selectedData.id,
      subject_id: selectedData.subject_id,
      file_name: selectedData.file_name,
    };

    await axios.post(`${axiosUrl}/subject/delete_lesson`, data, axiosConfig)
      .then(({data}) => {
        setLessons(data.data);
        
        setLoading(false);

        toast.success(data.message);
      })
      .catch((err) => {
        setLoading(false);

        toast.error(err.response?.data.message);
      })
  };

  const deleteAssignment = async () => {
    const data = {
      by_user_id: getUser().id,
      id: selectedData.id,
      subject_id: selectedData.subject_id,
      file_name: selectedData.file_name,
    };

    await axios.post(`${axiosUrl}/subject/delete_assignment`, data, axiosConfig)
      .then(({data}) => {
        setAssignments(data.data);

        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
      })
  };

  const deleteExam = async () => {
    const data = {
      by_user_id: getUser().id,
      id: selectedData.id,
      subject_id: selectedData.subject_id,
    };

    await axios.post(`${axiosUrl}/subject/delete_exam`, data, axiosConfig)
      .then(({data}) => {
        setExams(data.data);

        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
      })
  };

  const deleteQuiz = async () => {
    const data = {
      by_user_id: getUser().id,
      id: selectedData.id,
      subject_id: selectedData.subject_id,
    };

    await axios.post(`${axiosUrl}/subject/delete_quiz`, data, axiosConfig)
      .then(({data}) => {
        setQuizzes(data.data);

        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
      })
  }

  const deleteTaskPerformance = async () => {
    const data = {
      by_user_id: getUser().id,
      id: selectedData.id,
      subject_id: selectedData.subject_id,
    };

    await axios.post(`${axiosUrl}/subject/delete_task_performance`, data, axiosConfig)
      .then(({data}) => {
        setTaskPerformances(data.data);

        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
      })
  }

  const handleYes = () => {
    if (dialogMode === 'lesson') {
      deleteLesson();
    } else if (dialogMode === 'assignment') {
      deleteAssignment();
    } else if (dialogMode === 'teacher') {
      deleteTeacher();
    } else if (dialogMode === 'exam') {
      deleteExam();
    } else if (dialogMode === 'quiz') {
      deleteQuiz();
    } else if (dialogMode === 'task performance') {
      deleteTaskPerformance();
    }
  };

  const handleClose = () => {
    setOpenDialog(!openDialog);
    setSelectedData({});
  };

  const handleDeleteTeacher = (e, data) => {
    toggleConfirmationDialog('Delete Teacher', 'Are you sure you want to delete the selected teacher?.', 'teacher', data);
  };

  const handleDeleteLesson = (e, data) => {
    toggleConfirmationDialog('Delete Lesson', 'Are you sure you want to delete the selected lesson?.', 'lesson', data);
  };

  const handleDeleteAssignment = (e, data) => {
    toggleConfirmationDialog('Delete Assignment', 'Are you sure you want to delete the selected assignment?.', 'assignment', data);
  };

  const handleDeleteExam = (e, data) => {
    toggleConfirmationDialog('Delete Exam', 'Are you sure you want to delete the selected exam?.', 'exam', data);
  }

  const handleDeleteQuiz = (e, data) => {
    toggleConfirmationDialog('Delete Quiz', 'Are you sure you want to delete the selected quiz?.', 'quiz', data);
  }

  const handleDeleteTaskPerformance = (e, data) => {
    toggleConfirmationDialog('Delete Task Performance', 'Are you sure you want to delete the selected task performance?.', 'task performance', data);
  }

  useEffect(() => {
    fetchSubjectDetails();
  }, []);

  return {
    openDialog,
    dialogTitle,
    dialogMessage,
    handleClose,
    handleYes,

    handleAddTeacher,
    handleAddLesson,
    handleAddAssignment,
    handleAddExam,
    handleAddQuiz,
    handleAddTaskPerformance,

    handleSetAssignedLessons,
    handleSetAssignedTeachers,
    handleSetAssignedAssignments,
    handleSetAssignedExams,
    handleSetAssignedQuizzes,
    handleSetAssignedTaskPerformances,

    handleCloseTeacherModal,
    handleCloseLessonModal,
    handleCloseAssignmentModal,
    handleCloseExamModal,
    handleCloseQuizModal,
    handleCloseTaskPerformanceModal,

    handleDeleteTeacher,
    handleDeleteLesson,
    handleDeleteAssignment,
    handleDeleteExam,
    handleDeleteQuiz,
    handleDeleteTaskPerformance,

    teacherModalOpen,
    lessonModalOpen,
    assignmentModalOpen,
    examModalOpen,
    quizModalOpen,
    taskPerformanceModalOpen,

    loading,
    teachers,
    lessons,
    assignments,
    exams,
    quizzes,
    taskPerformances,
  };
};

export default useSubjectAssignments;