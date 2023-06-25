import { 
  useNavigate,
} from 'react-router';

import {
  BreadCrumbs, 
  Card,
  BarChart,
  AreaChart,
  LineChart,
} from '../../components';

import {
  Dashboard,
} from '@mui/icons-material';

import useTeacherDashboard from '../../hooks/use-teacher-dashboard';

import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  ERROR_COLOR,
} from '../../utils';

const ChartContainer = ({
  title,
  children,
}) => (
  <Card
    elevation={5}
    padding={15}
  >
    <div className='mb-3' align='center'>
      <span style={{
        fontWeight: 'bold',
        fontSize: 18,
      }}>
        {title}
      </span>
    </div>

    {children}
  </Card>
);

const TeacherDashboardPage = () => {
  const {
    response,
  } = useTeacherDashboard();

  return <>
    <div className='mb-4'>
      <BreadCrumbs
        links={[
          {
            label: 'Dashboard',
            icon: <Dashboard fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div>
      <div className='row g-4'>
        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
          <ChartContainer title='Grade Levels'>
            <BarChart 
              data={response?.grade_levels} 
              xAxis='name'
              bars={[
                { 
                  name: 'Students', 
                  dataKey: 'students', 
                  fill: PRIMARY_COLOR.bgColor, 
                  stackId: 'a',
                },
                { 
                  name: 'Subjects', 
                  dataKey: 'subjects', 
                  fill: SUCCESS_COLOR.bgColor,
                  stackId: 'a',
                }
              ]}
            />
          </ChartContainer>
        </div>

        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
          <ChartContainer title='School Years'>
            <LineChart 
              data={response?.school_years} 
              xAxis='name'
              lines={[
                { 
                  name: 'Students', 
                  dataKey: 'students', 
                  stroke: SUCCESS_COLOR.bgColor, 
                },
                { 
                  name: 'Teachers', 
                  dataKey: 'teachers', 
                  stroke: ERROR_COLOR.bgColor,
                },
              ]}
              />
          </ChartContainer>
        </div>

        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
          <ChartContainer title='Departments'>
            <LineChart 
              data={response?.departments} 
              xAxis='name'
              lines={[
                { 
                  name: 'Teachers', 
                  dataKey: 'teachers', 
                  sroke: PRIMARY_COLOR.bgColor,
                },
              ]}
            />
          </ChartContainer>
        </div>

        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
          <ChartContainer title='Subjects'>
            <AreaChart 
              data={response?.subjects} 
              xAxis='name'
              areas={[
                { 
                  name: 'Exams', 
                  dataKey: 'exams', 
                  stroke: PRIMARY_COLOR.bgColor,
                  fill: PRIMARY_COLOR.bgColor,
                },
                { 
                  name: 'Quizzes', 
                  dataKey: 'quizzes', 
                  stroke: SECONDARY_COLOR.bgColor,
                  fill: SECONDARY_COLOR.bgColor,
                },
                { 
                  name: 'Lessons', 
                  dataKey: 'lessons', 
                  stroke: SUCCESS_COLOR.bgColor,
                  fill: SUCCESS_COLOR.bgColor,
                },
                { 
                  name: 'Assignments', 
                  dataKey: 'assignments', 
                  stroke: ERROR_COLOR.bgColor,
                  fill: ERROR_COLOR.bgColor,
                  cardinal: true,
                },
                { 
                  name: 'Task Performances', 
                  dataKey: 'task_performances', 
                  stroke: PRIMARY_COLOR.bgColor,
                  fill: PRIMARY_COLOR.bgColor,
                },
              ]}
            />
          </ChartContainer>
        </div>
      </div>
    </div>
  </>
};

export default TeacherDashboardPage;