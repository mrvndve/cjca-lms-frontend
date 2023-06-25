import { Fragment } from 'react';

import { 
  EmptyBanner,
  Modal,
  Loading,
  SelectField,
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
} from '@mui/material';

import { 
  isEmpty,
} from 'lodash';

import useSubjectAssignTeachersForm from '../../../hooks/use-subject-assign-teachers-form';

const Teachers = ({
  data = [],
  title,
  handleAdd,
  handleRemove,
  isModalOpen,
  handleCloseModal,
  handleSetAssignedTeachers,
}) => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    teachers,
  } = useSubjectAssignTeachersForm({
    isModalOpen,
    handleClose: handleCloseModal,
    handleSetAssignedTeachers,
    teacherLists: data,
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
                      primary={<strong>{i.teacher.full_name}</strong>}
                    />
                  </ListItem>
    
                  <Divider component='li' />
                </Fragment>
              ))}
            </List>
            :
            <EmptyBanner text='No teachers found'/>
          }
        </div>
      </AccordionDetails>
    </Accordion>

    <Modal
      title='Add Teacher'
      isOpen={isModalOpen}
      handleClose={handleCloseModal}
    >
      {!loading
        ?
        <form id='assign-teacher-form' onSubmit={handleSubmit(onSubmit)} >
          <div className='row g-4'>
            <div className='col-12'>
              <SelectField
                name='user_id'
                label='Teacher'
                hasQuickAdd={true}
                quickAddPath='/admin/manage-teachers'
                options={teachers.map(data => ({
                  label: data.full_name,
                  value: data.id,
                }))}
                {...register('user_id', {
                  required: 'Teacher field is required.'
                })}
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
}

export default Teachers;