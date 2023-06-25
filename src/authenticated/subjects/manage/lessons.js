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
} from '../../../utils';

import { 
  isEmpty, 
} from 'lodash';

import useSubjectAssignLessonsForm from '../../../hooks/use-subject-assign-lessons-form';

import '../../../../src/App.css'

const Lessons = ({
  data = [],
  title,
  handleAdd,
  handleRemove,
  isModalOpen,
  handleCloseModal,
  handleSetAssignedLessons,
}) => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    handleUpload,
  } = useSubjectAssignLessonsForm({
    isModalOpen,
    handleClose: handleCloseModal,
    handleSetAssignedLessons,
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
                            {i.description}

                            <br/> <br/>

                            <span>
                              <a 
                                href={`${apiDomain}/uploads/${i.file_name}`}
                                target='_blank'
                                style={{ color: 'grey' }}
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
            <EmptyBanner text='No lessons found'/>
          }
        </div>
      </AccordionDetails>
    </Accordion>

    <Modal
      title='Add Lesson'
      isOpen={isModalOpen}
      handleClose={handleCloseModal}
    >
      {!loading
        ?
        <form id='assign-lesson-form' onSubmit={handleSubmit(onSubmit)} >
          <div className='row g-4'>
            <div className='col-12'>
              <TextField
                name='title'
                label='Title'
                {...register('title', { 
                  required: 'Title field is required.',
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-12'>
              <TextField
                name='description'
                label='Description'
                {...register('description', { 
                  required: 'Description field is required.',
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-12'>
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
              size='normal'
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

export default Lessons;
