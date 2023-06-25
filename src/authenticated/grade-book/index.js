import {
  Fragment,
} from 'react';

import { 
  BreadCrumbs,
  EmptyBanner,
  Card,
  Button,
  TextField,
  SelectField,
  Loading,
  Modal,
  ConfirmationDialog,
} from '../../components';

import { 
  Score,
  Dashboard,
} from '@mui/icons-material';

import {
  getUser,
  numbersOnly,
  apiDomain,
} from '../../utils';

import { 
  isEmpty,
} from 'lodash';

import useGradeBook from '../../hooks/use-grade-book';

import moment from 'moment';

const ModalForm = ({
  register,
  fieldErrors,
  onSubmit,
  handleSubmit,
  loading,
  isModalOpen,
  closeModal,
  selected,
  accessType,
}) => {
  return <>
    <Modal
      title='Evaluate'
      width={'30%'}
      isOpen={isModalOpen}
      handleClose={closeModal}
    >
      {!loading
        ?
        <form id='submit-ans-score-form' onSubmit={handleSubmit(onSubmit)} >
          <div className='row g-4'>  
            <div className='col-12'>
              <span>
                <strong>Answer:</strong>
              </span>

              <div>
                {selected?.answer}  
              </div>
            </div>

            {selected?.file_name &&
              <div className='col-12'>
                <span>
                  <strong>Attachment:</strong>
                </span>

                <div>
                  <a 
                    href={`${apiDomain}/uploads/${selected.file_name}`}
                    target='_blank'
                    style={{ color: 'black' }}
                  >
                    {selected.file_name}
                  </a> 
                </div>
              </div>
            }

            <div className='col-12'>
              <span>
                <strong>Total Points:</strong>
              </span>

              <div>
                {`${selected[accessType]?.total_points} points`}  
              </div>
            </div>

            <div className='col-12'>
              <span>
                <strong>Passing score:</strong>
              </span>

              <div>
                {`${selected[accessType]?.passing_score} points`}  
              </div>
            </div>

            <div className='col-12'>
              <TextField
                name='score'
                label='Score'
                {...register('score', { 
                  required: 'score field is required.',
                  pattern: {
                    value: numbersOnly,
                    message: 'score field must be numbers only.'
                  }
                })}
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

const GradeBookPage = () => {
  const {
    data,
    type,
    accessType,
    loading,
    handleTypeChange,
    handleSearch,
    exportToCSV,
    exportToCSVAll,

    register,
    onSubmit,
    fieldErrors,
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
  } = useGradeBook();

  return <>
    <div className='mb-4'>
      <BreadCrumbs
        links={[
          {
            label: 'Dashboard',
            icon: <Dashboard fontSize='inherit'/>,
            to: `/${getUser().role.toLowerCase()}`,
          },
          {
            label: 'Grade Book',
            icon: <Score fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div>
      <div className='mb-4 row g-0'>
        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
          <Card padding={15}>
            <div className='row g-3'>
              <div className='col-sm-12 col-md-12 col-lg-2 col-xl-4'/>

              <div className='col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                <Button
                  style={{ width: '100%' }}
                  label='Export All'
                  color='success'
                  onClick={exportToCSVAll}
                />
              </div>

              <div className='col-sm-12 col-md-12 col-lg-2 col-xl-1'>
                <Button
                  style={{ width: '100%' }}
                  label='Export'
                  color='success'
                  onClick={exportToCSV}
                />
              </div>

              <div className='col-sm-12 col-md-12 col-lg-4 col-xl-1'>
                <SelectField
                  options={[
                    { label: 'Exams', value: 'exams'},
                    { label: 'Quizzes', value: 'quizzes'},
                    { label: 'Task Performances', value: 'task_performances'},
                    { label: 'Assignments', value: 'assignments'},
                  ]}
                  label='Type'
                  defaultValue={type}
                  onChange={(e) => handleTypeChange(e)}
                />
              </div>

              <div className='col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                <TextField
                  label='Search'
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
  
      <div>
        {(!isEmpty(data)) 
          ?
          <Fragment>
            {!loading
              ?
              <div className='row g-4'>
                {data.map((i, index) => (
                  <Fragment key={index}>
                    <div className='col-12'>
                      <Card padding={20}>
                        <div>
                          <span 
                            style={{
                              fontWeight: 'bold',
                              fontSize: 18,
                            }}
                          >
                            {i.user.full_name}
                          </span>
                        </div>
    
                        <div>
                          <span 
                            style={{ 
                              fontSize: 13, 
                              color: 'grey' 
                            }}
                          >
                            {`Submitted At: ${moment(i.created_at).format('MMMM DD, YYYY hh:mm A')}`}
                          </span>
                        </div>
    
                        <div>
                          <span 
                            style={{ 
                              fontSize: 13, 
                              color: 'grey' 
                            }}
                          >
                            {`${accessType == 'exam' ? 'Exam' : (accessType == 'quiz' ? 'Quiz' : (accessType == 'task_performance' ? 'Task Performance' : 'Assignment'))}: ${i[accessType]?.title}`}
                          </span>
                        </div>
    
                        <div>
                          <span 
                            style={{ 
                              fontSize: 13, 
                              color: 'grey' 
                            }}
                          >
                            {`Total Points: ${i[accessType]?.total_points}`}
                          </span>
                        </div>
    
                        <div>
                          <span 
                            style={{ 
                              fontSize: 13, 
                              color: 'grey' 
                            }}
                          >
                            {`Level: ${i.user.grade.name}`}
                          </span>
                        </div>
    
                        <div>
                          <span 
                            style={{ 
                              fontSize: 13, 
                              color: 'grey' 
                            }}
                          >
                            {`Section: ${i.user.section.name}`}
                          </span>
                        </div>
    
                        <div align='right'>
                          {i.status != 'Pending'
                            ?
                            <div>
                              <span
                                className='me-3'
                                style={{ 
                                  fontSize: 18, 
                                  fontWeight: 'bold',
                                  color: `${i.status === 'Passed' ? '#1b5e20' : '#d32f2f'}`,
                                }}
                              >
                                {`${i.status}! (${i.score} / ${i[accessType]?.total_points})`}
                              </span>

                              {(accessType == 'quiz' || accessType == 'exam') &&
                                <span>
                                  <Button
                                    onClick={(e) => handleOpenDialog(e, i)}
                                    label='Retake'
                                    size='Normal'
                                  />
                                </span>
                              }
                            </div>
                            :
                            <Button
                              onClick={(e) => openModal(e, i)}
                              label='View Submission'
                              size='normal'
                            />
                          }
                        </div>
                      </Card>
                    </div>
                  </Fragment>
                ))}
              </div>
              :
              <Loading/>
            }
          </Fragment>
          :
          <EmptyBanner text={`No ${type.replace('_', ' ')} score found.`}/>
        }
      </div>
    </div>

    <ModalForm {...{
      register,
      fieldErrors,
      onSubmit,
      handleSubmit,
      loading: formLoading,
      isModalOpen,
      closeModal,
      selected,
      accessType,
    }}/>

    <ConfirmationDialog {...{
      open: openDialog,
      title: dialogTitle,
      message: dialogMessage,
      handleClose,
      handleYes,
    }}/>
  </>
};

export default GradeBookPage;