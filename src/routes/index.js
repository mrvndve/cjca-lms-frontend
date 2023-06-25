import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthRoute from './auth-route';

import PublicRoute from './public-route';

import LoginPage from '../unauthenticated/login-page';

import AnnouncementsPage from '../authenticated/announcements';

import AnnouncementsFormPage from '../authenticated/announcements/form';

import AdminDashboardPage from '../authenticated/dashboards/admin';

import TeacherDashboardPage from '../authenticated/dashboards/teachers';

import StudentsDashboardPage from '../authenticated/dashboards/students';

import StudentsAnnouncementPage from '../authenticated/student-announcements';

import ManageAdminsPage from '../authenticated/manage-admins';

import ManageAdminsFormPage from '../authenticated/manage-admins/form';

import ManageStudentsPage from '../authenticated/manage-students';

import ManageStudentsFormPage from '../authenticated/manage-students/form';

import ManageTeachersPage from '../authenticated/manage-teachers';

import ManageTeachersFormPage from '../authenticated/manage-teachers/form';

import SectionsPage from '../authenticated/sections';

import SectionsFormPage from '../authenticated/sections/form';

import DepartmentsPage from '../authenticated/departments';

import DepartmentsFormPage from '../authenticated/departments/form';

import SchoolYearsPage from '../authenticated/school-years';

import SchoolYearsFormPage from '../authenticated/school-years/form';

import GradeLevelsPage from '../authenticated/grade-levels';

import GradeLevelsFormPage from '../authenticated/grade-levels/form';

import StrandCoursesPage from '../authenticated/strand-crouses';

import StrandCoursesFormPage from '../authenticated/strand-crouses/form';

import SubjectsPage from '../authenticated/subjects';

import SubjectsFormPage from '../authenticated/subjects/form';

import ManageSubjects from '../authenticated/subjects/manage';

import AdminSettingsPage from '../authenticated/settings/admin';

import GradeBookPage from '../authenticated/grade-book';

import TeacherSettingsPage from '../authenticated/settings/teacher';

import ExamsPage from '../authenticated/exams';

import ExamFormPage from '../authenticated/exams/form';

import TaskPerformancesPage from '../authenticated/task-perfomances';

import QuizzesPage from '../authenticated/quizzes';

import QuizzesFormPage from '../authenticated/quizzes/form';

import AssignmentsPage from '../authenticated/assignments';

import StudentSettingsPage from '../authenticated/settings/student';

import AuditsPage from '../authenticated/audits';

import ErrorPage from '../unauthenticated/error.page';

const AppRoutes = () => {
  const adminPages = [
    {
      path: '/admin', 
      page: <AdminDashboardPage/>,
    },
    {
      path: '/admin/announcements', 
      page: <AnnouncementsPage/>,
    },
    {
      path: '/admin/announcements/:mode', 
      page: <AnnouncementsFormPage/>,
    },
    {
      path: '/admin/manage-admins', 
      page: <ManageAdminsPage/>,
    },
    {
      path: '/admin/manage-admins/:mode', 
      page: <ManageAdminsFormPage/>,
    },
    {
      path: '/admin/manage-students', 
      page: <ManageStudentsPage/>,
    },
    {
      path: '/admin/manage-students/:mode', 
      page: <ManageStudentsFormPage/>,
    },
    {
      path: '/admin/manage-teachers', 
      page: <ManageTeachersPage/>,
    },
    {
      path: '/admin/manage-teachers/:mode', 
      page: <ManageTeachersFormPage/>,
    },
    {
      path: '/admin/sections', 
      page: <SectionsPage/>,
    },
    {
      path: '/admin/sections/:mode', 
      page: <SectionsFormPage/>,
    },
    {
      path: '/admin/departments', 
      page: <DepartmentsPage/>,
    },
    {
      path: '/admin/departments/:mode', 
      page: <DepartmentsFormPage/>,
    },
    {
      path: '/admin/school-years', 
      page: <SchoolYearsPage/>,
    },
    {
      path: '/admin/school-years/:mode', 
      page: <SchoolYearsFormPage/>,
    },
    {
      path: '/admin/grade-levels', 
      page: <GradeLevelsPage/>,
    },
    {
      path: '/admin/grade-levels/:mode', 
      page: <GradeLevelsFormPage/>,
    },
    {
      path: '/admin/strand-courses', 
      page: <StrandCoursesPage/>,
    },
    {
      path: '/admin/strand-courses/:mode', 
      page: <StrandCoursesFormPage/>,
    },
    {
      path: '/admin/subjects/', 
      page: <SubjectsPage/>,
    },
    {
      path: '/admin/subjects/:mode', 
      page: <SubjectsFormPage/>,
    },
    {
      path: '/admin/subjects/manage/:id', 
      page: <ManageSubjects/>,
    },
    {
      path: '/admin/settings', 
      page: <AdminSettingsPage/>,
    },
    {
      path: '/admin/audits', 
      page: <AuditsPage/>,
    },
  ];

  const teacherPages = [
    {
      path: '/teacher', 
      page: <TeacherDashboardPage/>,
    },
    {
      path: '/teacher/announcements/', 
      page: <AnnouncementsPage/>,
    },
    {
      path: '/teacher/announcements/:mode', 
      page: <AnnouncementsFormPage/>,
    },
    {
      path: '/teacher/subjects/', 
      page: <SubjectsPage/>,
    },
    {
      path: '/teacher/subjects/:mode', 
      page: <SubjectsFormPage/>,
    },
    {
      path: '/teacher/subjects/manage/:id', 
      page: <ManageSubjects/>,
    },
    {
      path: '/teacher/manage-teachers', 
      page: <ManageTeachersPage/>,
    },
    {
      path: '/teacher/manage-students', 
      page: <ManageStudentsPage/>,
    },
    {
      path: '/teacher/manage-students/:mode', 
      page: <ManageStudentsFormPage/>,
    },
    {
      path: '/teacher/grade-book',
      page: <GradeBookPage/>,
    },
    {
      path: '/teacher/settings', 
      page: <TeacherSettingsPage/>,
    },
  ];

  const studentPages = [
    {
      path: '/student', 
      page: <StudentsDashboardPage/>,
    },
    {
      path: '/student/announcements',
      page: <StudentsAnnouncementPage/>,
    },
    {
      path: '/student/quizzes',
      page: <QuizzesPage/>,
    },
    {
      path: '/student/quizzes/take-quiz',
      page: <QuizzesFormPage/>,
    },
    {
      path: '/student/exams',
      page: <ExamsPage/>,
    },
    {
      path: '/student/exams/take-exam',
      page: <ExamFormPage/>,
    },
    {
      path: '/student/task-performances',
      page: <TaskPerformancesPage/>,
    },
    {
      path: '/student/assignments',
      page: <AssignmentsPage/>,
    },
    {
      path: '/student/settings', 
      page: <StudentSettingsPage/>,
    },
  ];

  const protectedPages = adminPages.concat(teacherPages, studentPages);

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }/>

        <Route path='/login' element={
            <PublicRoute>
              <LoginPage/>
            </PublicRoute>
          }
        />

        {protectedPages.map((p, i) => (
          <Route
            key={i}
            path={p.path}
            element={
              <AuthRoute>
                {p.page}
              </AuthRoute>
            }
          />
        ))}

        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default AppRoutes;
