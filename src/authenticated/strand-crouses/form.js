import React, { Fragment } from 'react';

import useStrandCoursesForm from '../../hooks/use-strand-courses-form';

import { 
  TextField,
  Button,
  BreadCrumbs,
  Card,
  Loading,
} from '../../components';

import {
  Dashboard,
  Add,
  Edit,
  GolfCourse,
} from '@mui/icons-material';

const StrandCoursesFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    selectedRow,
  } = useStrandCoursesForm();

  return <>
    {(mode === 'add' || mode === 'edit') &&
      <Fragment>
        <div className='mb-4'>
          <BreadCrumbs
            links={[
              {
                label: 'Dashboard',
                icon: <Dashboard fontSize='inherit'/>,
                to: '/admin'
              },
              {
                label: 'Strand Course',
                icon: <GolfCourse fontSize='inherit'/>,
                to: '/admin/strand-courses',
              },
              {
                label: `${mode === 'add' ? 'Add' : 'Edit'} Strand Course`,
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
              <form id='strand-cours-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-4'>
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='code'
                      label='Code'
                      {...register('code', { 
                        required: 'Code field is required.',
                      })}
                      defaultValue={selectedRow?.code}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='name'
                      label='Name'
                      {...register('name', { 
                        required: 'Name field is required.',
                      })}
                      defaultValue={selectedRow?.name}
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
                      defaultValue={selectedRow?.name}
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

export default StrandCoursesFormPage;