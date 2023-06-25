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
  Quiz,
} from '@mui/icons-material';

import { 
  useNavigate, 
} from 'react-router';

import useStudentQuizzesPage from '../../hooks/use-student-quizzes-page';

import { 
  isEmpty,
} from 'lodash';

import moment from 'moment';

const QuizzesPage = () => {
  const {
    response,
    subjectTeachers,
  } = useStudentQuizzesPage();

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
            label: 'Quizzes',
            icon: <Quiz fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='row g-0'>
      <div className='col-12'>
        <div className='row g-4'>
          {!isEmpty(subjects && subjects.filter(r => !isEmpty(r.quizzes)))
            ?
            subjects.map((subj, index) => (
              subj.quizzes && subj.quizzes.map((quiz, quizIndex) => (
                <Fragment key={quizIndex}>
                  <Card padding={25}>
                    <div>
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          fontSize: 16,
                        }}
                      >
                        {`${quiz.title} for ${subj.name}  (${(subj.strand_course ? `${subj.grade.name} - ${subj.strand_course.name} - ${subj.semester}` : `${subj.grade.name} - ${subj.grading}`)})`}
                      </span>
                    </div>

                    <div>
                      <span 
                        style={{ 
                          fontSize: 13, 
                          color: 'grey' 
                        }}
                      >
                        {`Total Points - ${quiz.total_points}`}
                      </span>
                    </div>

                    <div>
                      <span 
                        style={{ 
                          fontSize: 13, 
                          color: 'grey' 
                        }}
                      >
                        {`Due Date - ${moment(quiz.due_date).format('MMMM DD, YYYY hh:mm A')}`}
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
                      {quiz.is_submitted 
                        ?
                        <span 
                          style={{ 
                            fontSize: 18, 
                            fontWeight: 'bold',
                            color: `${quiz.is_submitted.status === 'Passed' ? '#1b5e20' : '#d32f2f'}`,
                          }}
                        >
                          {`${quiz.is_submitted.status}! (${quiz.is_submitted.score} / ${quiz.total_points})`}
                        </span>
                        :
                        <Button
                          label={subj.teachers.length > 0 ? 'Take Quiz' : 'No teacher/s found'}
                          size='normal'
                          onClick={() => navigate(`/student/quizzes/take-quiz`, { state: {teachers: subj.teachers, ...quiz} })}
                          disabled={subj.teachers.length === 0 || isDueDate(quiz.due_date)}
                        />
                      }
                    </div>
                  </Card>
                </Fragment>
              ))
            ))
            :
            <EmptyBanner text='No quizzes found.'/>
          }
        </div>
      </div>
    </div>
  </>
};

export default QuizzesPage;