import React, { 
  Fragment,
} from 'react';

import useAnnouncementsForm from '../../hooks/use-announcements-form';

import { 
  TextField,
  TextAreaField,
  Button,
  BreadCrumbs,
  Card,
  Loading,
} from '../../components';

import {
  Dashboard,
  Add,
  Edit,
  Announcement,
} from '@mui/icons-material';

import { 
  getUser, 
} from '../../utils';

const AnnouncementsFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    selectedRow,
  } = useAnnouncementsForm();

  return <>
    {(mode === 'add' || mode === 'edit') &&
      <Fragment>
        <div className='mb-4'>
          <BreadCrumbs
            links={[
              {
                label: 'Dashboard',
                icon: <Dashboard fontSize='inherit'/>,
                to: `/${getUser().role.toLowerCase()}`
              },
              {
                label: 'Announcement',
                icon: <Announcement fontSize='inherit'/>,
                to: `/${getUser().role.toLowerCase()}/announcements`,
              },
              {
                label: `${mode === 'add' ? 'Add' : 'Edit'} Announcement`,
                icon: mode === 'add' ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
                active: true,
              },
            ]}
          />
        </div>

        <Card style={{ padding: '35px 25px 25px 25px', }}>
          {!loading
            ?
            <div>
              <form id='announcements-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-4'>
                  <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <TextField
                      name='title'
                      label='Title'
                      {...register('title', { 
                        required: 'Title field is required.',
                      })}
                      defaultValue={selectedRow?.title}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <TextAreaField
                      name='content'
                      label='Content'
                      {...register('content', { 
                        required: 'Content field is required.',
                      })}
                      defaultValue={selectedRow?.content}
                      errors={fieldErrors}
                    />
                  </div>
                </div>
    
                <div className='mt-4' align='right'>
                  <Button
                    type='submit'
                    label={`${mode === 'add' ? 'Save' : 'Update'}`}
                  />
                </div>
              </form>
            </div>
            :
            <Loading/>
          }
        </Card>
      </Fragment>
    }
  </>
}

export default AnnouncementsFormPage;