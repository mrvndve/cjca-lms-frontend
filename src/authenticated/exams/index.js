import { 
  Fragment,
} from 'react';

import {
  BreadCrumbs,
  Card,
  EmptyBanner,
  Button,
} from '../../components';

import {
  Dashboard,
  Assessment,
} from '@mui/icons-material';

import { 
  useNavigate, 
} from 'react-router';

import useStudentExamsPage from '../../hooks/use-student-exams-page';

import { 
  isEmpty,
} from 'lodash';

import moment from 'moment';

const ExamsPage = () => {
  const {
    response,
    subjectTeachers,
  } = useStudentExamsPage();

  const {
    subjects,
  } = response;

  const navigate = useNavigate();

  const isDueDate = (dueDate) => {
    dueDate = moment(dueDate).format('YYYY-MM-DD H:mm');
    const dateNow = moment(new Date()).format('YYYY-MM-DD H:mm');
    return dateNow >= dueDate;
  };

  return <>
    <div className='mb-5'>
      <BreadCrumbs
        links={[
          {
            label: 'Dashboard',
            icon: <Dashboard fontSize='inherit'/>,
            to: '/student',
          },
          {
            label: 'Exams',
            icon: <Assessment fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='row g-0'>
      <div className='col-12'>
        <div className='row g-4'>
          {!isEmpty(subjects && subjects.filter(r => !isEmpty(r.exams)))
            ?
            subjects.map((subj, index) => (
              subj.exams && subj.exams.map((exam, examIndex) => (
                <Fragment key={examIndex}>
                  <Card padding={25}>
                    <div>
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          fontSize: 16,
                        }}
                      >
                        {`${exam.title} for ${subj.name}  (${(subj.strand_course ? `${subj.grade.name} - ${subj.strand_course.name} - ${subj.semester}` : `${subj.grade.name} - ${subj.grading}`)})`}
                      </span>
                    </div>

                    <div>
                      <span 
                        style={{ 
                          fontSize: 13, 
                          color: 'grey' 
                        }}
                      >
                        {`Total Points - ${exam.total_points}`}
                      </span>
                    </div>

                    <div>
                      <span 
                        style={{ 
                          fontSize: 13, 
                          color: 'grey' 
                        }}
                      >
                        {`Due Date - ${moment(exam.due_date).format('MMMM DD, YYYY hh:mm A')}`}
                      </span>
                    </div>

                    <div className='mb-3'>
                      <span 
                        style={{ 
                          fontSize: 13, 
                          color: 'grey' 
                        }}
                      >
                        {`Teachers - ${subjectTeachers(subj.teachers)}`}
                      </span>
                    </div>

                    <div className='mt-3' align='right'>
                      {exam.is_submitted 
                        ?
                        <span 
                          style={{ 
                            fontSize: 18, 
                            fontWeight: 'bold',
                            color: `${exam.is_submitted.status === 'Passed' ? '#1b5e20' : '#d32f2f'}`,
                          }}
                        >
                          {`${exam.is_submitted.status}! (${exam.is_submitted.score} / ${exam.total_points})`}
                        </span>
                        :
                        <Button
                          label={subj.teachers.length > 0 ? 'Take Exam' : 'No teacher/s found'}
                          size='normal'
                          onClick={() => navigate(`/student/exams/take-exam`, { state: {teachers: subj.teachers, ...exam} })}
                          disabled={subj.teachers.length === 0 || isDueDate(exam.due_date)}
                        />
                      }
                    </div>
                  </Card>
                </Fragment>
              ))
            ))
            :
            <EmptyBanner text='No exams found.'/>
          }
        </div>
      </div>
    </div>
  </>
};

export default ExamsPage;