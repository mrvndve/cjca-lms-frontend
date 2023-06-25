import { Fragment } from 'react';

import { 
  BreadCrumbs,
  ConfirmationDialog,
} from '../../../components';

import {
  Dashboard,
  Subject,
  Settings,
} from '@mui/icons-material';

import { 
  getUser,
} from '../../../utils';

import Lessons from './lessons';

import Teachers from './teachers';

import Assignments from './assignments';

import Exams from './exams';

import Quizzes from './quizzes';

import TaskPerformances from './task-performances';

import useSubjectsManage from '../../../hooks/use-subjects-manage';

const ManageSubjects = () => {
  const {
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
  } = useSubjectsManage();

  return <>
    <div className='mb-5'>
      <BreadCrumbs
        links={[
          {
            label: 'Dashboard',
            icon: <Dashboard fontSize='inherit'/>,
            to: `/${getUser().role.toLowerCase()}`,
          },
          {
            label: 'Subject',
            icon: <Subject fontSize='inherit'/>,
            to: `/${getUser().role.toLowerCase()}/subjects`,
          },
          {
            label: 'Manage Subject',
            icon: <Settings/>,
            active: true,
          },
        ]}
      />
    </div>
    
    <div className='row g-4'>
      {getUser().role === 'ADMIN' &&
        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
          <Teachers {...{
            data: teachers,
            title: 'Teachers',
            handleAdd: handleAddTeacher,
            handleRemove: handleDeleteTeacher,
            isModalOpen: teacherModalOpen,
            handleCloseModal: handleCloseTeacherModal,
            handleSetAssignedTeachers,
          }}/>
        </div>
      }

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <Lessons {...{
          data: lessons,
          title: 'Lessons',
          handleAdd: handleAddLesson,
          handleRemove: handleDeleteLesson,
          isModalOpen: lessonModalOpen,
          handleCloseModal: handleCloseLessonModal,
          handleSetAssignedLessons,
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <Assignments {...{
          data: assignments,
          title: 'Homeworks',
          handleAdd: handleAddAssignment,
          handleRemove: handleDeleteAssignment,
          isModalOpen: assignmentModalOpen,
          handleCloseModal: handleCloseAssignmentModal,
          handleSetAssignedAssignments,
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <TaskPerformances {...{
          data: taskPerformances,
          title: 'Task Performances',
          handleAdd: handleAddTaskPerformance,
          handleRemove: handleDeleteTaskPerformance,
          isModalOpen: taskPerformanceModalOpen,
          handleCloseModal: handleCloseTaskPerformanceModal,
          handleSetAssignedTaskPerformances,
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <Exams {...{
          data: exams,
          title: 'Exams',
          handleAdd: handleAddExam,
          handleRemove: handleDeleteExam,
          isModalOpen: examModalOpen,
          handleCloseModal: handleCloseExamModal,
          handleSetAssignedExams,
        }}/>
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-4'>
        <Quizzes {...{
          data: quizzes,
          title: 'Quizzes',
          handleAdd: handleAddQuiz,
          handleRemove: handleDeleteQuiz,
          isModalOpen: quizModalOpen,
          handleCloseModal: handleCloseQuizModal,
          handleSetAssignedQuizzes,
        }}/>
      </div>
    </div>

    <ConfirmationDialog {...{
      open: openDialog,
      title: dialogTitle,
      message: dialogMessage,
      handleClose,
      handleYes,
    }}/>
  </>
};

export default ManageSubjects;