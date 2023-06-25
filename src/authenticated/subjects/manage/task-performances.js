import { 
  Fragment,
} from 'react';

import { 
  BreadCrumbs,
  EmptyBanner,
  ConfirmationDialog,
  Modal,
  Loading,
  TextField,
  UploadField,
  Button,
  DateTimeField,
} from '../../../components';

import {
  Add,
  Delete,
} from '@mui/icons-material';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';

import { 
  apiDomain,
  getUser,
  numbersOnly,
} from '../../../utils';

import { 
  isEmpty, 
} from 'lodash';

import moment from 'moment';

import useSubjectAssignTaskPerformancesForm from '../../../hooks/use-subject-assign-task-performances-form';

import '../../../../src/App.css'

const TaskPerformances = ({
  data = [],
  title,
  handleAdd,
  handleRemove,
  isModalOpen,
  handleCloseModal,
  handleSetAssignedTaskPerformances,
}) => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    handleUpload,
  } = useSubjectAssignTaskPerformancesForm({
    isModalOpen,
    handleClose: handleCloseModal,
    handleSetAssignedTaskPerformances,
  });

  return <>
    <Accordion expanded>
      <AccordionSummary 
        style={{ cursor: 'default' }} 
        expandIcon={
          <IconButton color='primary' component='label' onClick={(e) => handleAdd(e)}>
            <Add/>
          </IconButton>
        }
      >
        <strong>
          {title}
        </strong>
      </AccordionSummary>

      <hr style={{ margin: 0 }}/>

      <AccordionDetails className='p-2'>
        <div style={{ height: 350, overflowY: 'auto', overflowX: 'hidden' }}>
          {!isEmpty(data)
            ?
            <List>
              {data.map((i, index) => (
                <Fragment key={index}>
                  <ListItem
                    alignItems='flex-start'
                    secondaryAction={
                      <IconButton color='error' edge='end' onClick={(e) => handleRemove(e, i)}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={<strong>{i.title}</strong>}
                      secondary={
                        <Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component='span'
                            variant='body2'
                          >
                            {`Due Date - ${moment(i.due_date).format('MMMM DD YYYY')}`}

                            <br/>

                            {`Total Points: - ${i.total_points}`}

                            <br/>

                            {i.description}

                            <br/> <br/>

                            <span>
                              <a 
                                href={`${apiDomain}/uploads/${i.file_name}`}
                                target='_blank'
                                style={{ color: 'black' }}
                              >
                                {i.file_name}
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
            <EmptyBanner text='No assignments found'/>
          }
        </div>
      </AccordionDetails>
    </Accordion>

    <Modal
      title='Add Task Performance'
      width={'60%'}
      isOpen={isModalOpen}
      handleClose={handleCloseModal}
    >
      {!loading
        ?
        <form id='assign-tp-form' onSubmit={handleSubmit(onSubmit)} >
          <div className='row g-4'>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <DateTimeField
                name='due_date'
                label='Due Date'
                {...register('due_date', {
                  required: 'Due date field is required.'
                })}
                errors={fieldErrors}
              />
            </div>
            
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <TextField
                name='title'
                label='Title'
                {...register('title', { 
                  required: 'Title field is required.',
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <TextField
                name='description'
                label='Description'
                {...register('description', { 
                  required: 'Description field is required.',
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <TextField
                name='total_points'
                label='Total Points'
                {...register('total_points', { 
                  required: 'Total points field is required.',
                  pattern: {
                    value: numbersOnly,
                    message: 'Total points field must be numbers only.'
                  }
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <TextField
                name='passing_score'
                label='Passing Score'
                {...register('passing_score', { 
                  required: 'Passing score field is required.',
                  pattern: {
                    value: numbersOnly,
                    message: 'Passing score field must be numbers only.'
                  }
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <UploadField
                name='upload_file'
                label='Upload File (xlsx, doc, ppt, pdf, video)'
                {...register('upload_file', { 
                  required: 'Upload file field is required.',
                })}
                accept='.xlsx, .xls, .doc, .docx, .ppt, .pptx, .pdf, video/mp4, video/x-m4v, video/*'
                handleUpload={handleUpload}
                errors={fieldErrors}
              />
            </div>
          </div>

          <div className='mt-4' align='right'>
            <Button
              type='submit'
              label='Add'
            />
          </div>
        </form>
        :
        <Loading/>
      }
    </Modal>
  </>
};

export default TaskPerformances;
