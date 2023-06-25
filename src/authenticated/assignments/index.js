import { 
  Fragment,
} from 'react';

import {
  BreadCrumbs,
  Card,
  EmptyBanner,
  Button,
  Modal,
  UploadField,
  TextAreaField,
  Loading,
} from '../../components';

import {
  Dashboard,
  Assignment,
} from '@mui/icons-material';

import useStudentAssignmentPage from '../../hooks/use-student-assignments-page';

import useStudentAssignmentsForm from '../../hooks/use-student-assignments-form';

import { 
  isEmpty,
} from 'lodash';

import moment from 'moment';

import { 
  apiDomain,
} from '../../utils';

const ModalForm = ({
  isModalOpen,
  toggleModal,
  selected,
  fetchSubjectDetails,
}) => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    handleUpload,
  } = useStudentAssignmentsForm({
    selected,
    toggleModal,
    fetchSubjectDetails,
  });

  return <>
    <Modal
      title='Submit Homework'
      width={'30%'}
      isOpen={isModalOpen}
      handleClose={toggleModal}
    >
      {!loading
        ?
        <form id='submit-assign-form' onSubmit={handleSubmit(onSubmit)} >
          <div className='row g-4'>  
            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <TextAreaField
                name='answer'
                label='Answer'
                {...register('answer', { 
                  required: 'Answer field is required.',
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <UploadField
                name='upload_file'
                label='Attachment'
                {...register('upload_file')}
                accept='.xlsx, .xls, .doc, .docx, .ppt, .pptx, .pdf, video/mp4, video/x-m4v, video/*'
                handleUpload={handleUpload}
                errors={fieldErrors}
              />
            </div>
          </div>

          <div className='mt-4' align='right'>
            <Button
              type='submit'
              label='Submit'
            />
          </div>
        </form>
        :
        <Loading/>
      }
    </Modal>
  </>
};
  
const AssignmentsPage = () => {
  const {
    response,
    subjectTeachers,
    isModalOpen,
    toggleModal,
    selected,
    fetchSubjectDetails,
  } = useStudentAssignmentPage();

  const {
    subjects,
  } = response;

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
            label: 'Assignments',
            icon: <Assignment fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='row g-0'>
      <div className='col-12'>
        <div className='row g-4'>
          {!isEmpty(subjects && subjects.filter(r => !isEmpty(r.assignments)))
            ?
            subjects.map((subj, index) => (
              subj.assignments && subj.assignments.map((ass, assIndex) => (
                <Fragment key={assIndex}>
                  <Card padding={25}>
                    <div>
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          fontSize: 16,
                        }}
                      >
                        {`${ass.title} for ${subj.name}  (${(subj.strand_course ? `${subj.grade.name} - ${subj.strand_course.name} - ${subj.semester}` : `${subj.grade.name} - ${subj.grading}`)})`}
                      </span>
                    </div>

                    <div>
                      <span 
                        style={{ 
                          fontSize: 13, 
                          color: 'grey' 
                        }}
                      >
                        {`Due Date - ${moment(ass.due_date).format('MMMM DD, YYYY hh:mm A')}`}
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

                    <div className='mb-2'>
                      <span 
                        style={{ 
                          fontSize: 13, 
                          color: 'grey' 
                        }}
                      >
                        {ass.description}
                      </span>
                    </div>

                    <div>
                      <a 
                        href={`${apiDomain}/uploads/${ass.file_name}`}
                        target='_blank'
                        style={{ color: 'black' }}
                      >
                        {ass.file_name}
                      </a> 
                    </div>

                    <div className='mt-3' align='right'>
                      {ass.is_submitted 
                        ?
                        <Fragment>
                          {ass.is_submitted.status !== 'Pending'
                            ?
                            <span 
                              style={{ 
                                fontSize: 18, 
                                fontWeight: 'bold',
                                color: `${ass.is_submitted.status === 'Passed' ? '#1b5e20' : '#d32f2f'}`,
                              }}
                            >
                              {`${ass.is_submitted.status}! (${ass.is_submitted.score} / ${ass.total_points})`}
                            </span>
                            :
                            <span 
                              style={{ 
                                fontSize: 18, 
                                fontWeight: 'bold',
                                color: '#1b5e20',
                              }}
                            >
                              Pending to Check
                            </span>
                          }
                        </Fragment>
                        :
                        <Button
                          label={subj.teachers.length > 0 ? 'Submit Assignment' : 'No teacher/s found'}
                          onClick={(e) => toggleModal(e, {teachers: subj.teachers, ...ass})}
                          size='normal'
                          disabled={subj.teachers.length === 0 || isDueDate(ass.due_date)}
                        />
                      }
                    </div>
                  </Card>
                </Fragment>
              ))
            ))
            :
            <EmptyBanner text='No assignments found.'/>
          }
        </div>
      </div>
    </div>

    <ModalForm {...{
      isModalOpen,
      toggleModal,
      selected,
      fetchSubjectDetails,
    }}/>
  </>
}
  
export default AssignmentsPage;