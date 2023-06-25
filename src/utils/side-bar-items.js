import {
  Dashboard,
  Announcement,
  Settings,
  AdminPanelSettings,
  School,
  Backpack,
  Class,
  Business,
  Search,
  CalendarMonth,
  Star,
  GolfCourse,
  Subject,
  Home,
  Assignment,
  Assessment,
  Quiz,
  Score,
  Task,
} from '@mui/icons-material';

export const adminSideBarItems = [
  {
    label: 'Dashboard',
    icon: <Dashboard style={{ color: 'white' }}/>,
    path: '/admin',
  },
  {
    label: 'Announcements',
    icon: <Announcement style={{ color: 'white' }}/>,
    path: '/admin/announcements',
  },
  {
    label: 'Admins',
    icon: <AdminPanelSettings style={{ color: 'white' }}/>,
    path: '/admin/manage-admins',
  },
  {
    label: 'School Year',
    icon: <CalendarMonth style={{ color: 'white' }}/>,
    path: '/admin/school-years',
  },
  {
    label: 'Grade Levels',
    icon: <Star style={{ color: 'white' }}/>,
    path: '/admin/grade-levels',
  },
  {
    label: 'Strand Courses',
    icon: <GolfCourse style={{ color: 'white' }}/>,
    path: '/admin/strand-courses',
  },
  {
    label: 'Sections',
    icon: <Class style={{ color: 'white' }}/>,
    path: '/admin/sections',
  },
  {
    label: 'Departments',
    icon: <Business style={{ color: 'white' }}/>,
    path: '/admin/departments',
  },
  {
    label: 'Subjects',
    icon: <Subject style={{ color: 'white' }}/>,
    path: '/admin/subjects',
  },
  {
    label: 'Teachers',
    icon: <School style={{ color: 'white' }}/>,
    path: '/admin/manage-teachers',
  },
  {
    label: 'Students',
    icon: <Backpack style={{ color: 'white' }}/>,
    path: '/admin/manage-students'
  },
  {
    label: 'History Logs',
    icon: <Search style={{ color: 'white' }}/>,
    path: '/admin/audits',
  },
  {
    label: 'Settings',
    icon: <Settings style={{ color: 'white' }}/>,
    path: '/admin/settings',
  }
];

export const teacherSideBarItems = [
  {
    label: 'Dashboard',
    icon: <Dashboard style={{ color: 'white' }}/>,
    path: '/teacher',
  },
  {
    label: 'Announcements',
    icon: <Announcement style={{ color: 'white' }}/>,
    path: '/teacher/announcements',
  },
  {
    label: 'Subjects',
    icon: <Subject style={{ color: 'white' }}/>,
    path: '/teacher/subjects',
  },
  {
    label: 'Students',
    icon: <Backpack style={{ color: 'white' }}/>,
    path: '/teacher/manage-students',
  },
  {
    label: 'Grade Book',
    icon: <Score style={{ color: 'white' }}/>,
    path: '/teacher/grade-book',
  },
  {
    label: 'Settings',
    icon: <Settings style={{ color: 'white' }}/>,
    path: '/teacher/settings',
  }
];

export const studentSideBarItems = [
  {
    label: 'Dashboard',
    icon: <Home style={{ color: 'white' }}/>,
    path: '/student',
  },
  {
    label: 'Announcements',
    icon: <Announcement style={{ color: 'white' }}/>,
    path: '/student/announcements',
  },
  {
    label: 'Quizzes',
    icon: <Quiz style={{ color: 'white' }}/>,
    path: '/student/quizzes',
  },
  {
    label: 'Exams',
    icon: <Assessment style={{ color: 'white' }}/>,
    path: '/student/exams',
  },
  {
    label: 'Task Performances',
    icon: <Task style={{ color: 'white' }}/>,
    path: '/student/task-performances',
  },
  {
    label: 'Assignments',
    icon: <Assignment style={{ color: 'white' }}/>,
    path: '/student/assignments',
  },
  {
    label: 'Settings',
    icon: <Settings style={{ color: 'white' }}/>,
    path: '/student/settings',
  }
];
