import { 
  Fragment, 
} from 'react';

import {
  BreadCrumbs, 
  CardWithMedia,
  EmptyBanner,
} from '../../components';

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';

import {
  Dashboard,
} from '@mui/icons-material';

import { 
  apiDomain, 
} from '../../utils';

import { 
  isEmpty,
} from 'lodash';

import useStudentDashboard from '../../hooks/use-student-dashboard';

const StudentsDashboardPage = () => {
  const {
    response,
    subjectTeachers,
  } = useStudentDashboard();

  const {
    subjects,
  } = response;

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
        {subjects && subjects.map((subj, subjIndex) => (
          <Fragment key={subjIndex}>
            <div className='col-sm-12 col-md-12 col-lg-6 col-xl-3'>
              <CardWithMedia 
                contentStyle={{ 
                  height: 300,
                  padding: 0,
                  overflowY: 'auto', 
                  overflowX: 'hidden',
                }} 
                title={
                  <span style={{ 
                    fontSize: 18,
                    fontWeight: 'bold'
                  }}>
                    {`${subj.name}  (${(subj.strand_course ? `${subj.grade.name} - ${subj.strand_course.name} - ${subj.semester}` : `${subj.grade.name} - ${subj.grading}`)})`}
                  </span>
                }
                subheader={ 
                  <span style={{ fontSize: 14 }}>
                    {`Teachers - ${subjectTeachers(subj.teachers)}`}
                  </span>
                }
              >
                {!isEmpty(subj.lessons)
                  ?
                  <List>
                    {subj.lessons.map((lesson, lessonIndex) => (
                      <Fragment key={lessonIndex}>
                        <ListItem alignItems='flex-start'>
                          <ListItemText
                            primary={
                              <span>
                                {lesson.title}
                              </span>
                            }
                            secondary={
                              <Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component='span'
                                  variant='body2'
                                >
                                  {lesson.description}
    
                                  <br/> <br/>
    
                                  <span>
                                    <a 
                                      href={`${apiDomain}/uploads/${lesson.file_name}`}
                                      target='_blank'
                                      style={{
                                        color: 'grey',
                                      }}
                                    >
                                      {lesson.file_name}
                                    </a> 
                                  </span>
                                </Typography>
                              </Fragment>
                            }
                          />
                        </ListItem>
          
                        <Divider component='li' />
                      </Fragment>
                    ))}
                  </List>
                  :
                  <div style={{ height: 250 }}>
                    <EmptyBanner text='No lessons found.'/>
                  </div>
                }
              </CardWithMedia>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  </>
};

export default StudentsDashboardPage;