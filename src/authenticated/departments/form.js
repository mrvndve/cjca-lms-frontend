import React, { Fragment } from 'react';

import useDepartmentsForm from '../../hooks/use-departments-form';

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
  Business,
} from '@mui/icons-material';

const DepartmentsFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    selectedRow,
  } = useDepartmentsForm();

  return <>
    {(mode === 'add' || mode === 'edit') &&
      <Fragment>
        {!loading
          ?
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
                    label: 'Department',
                    icon: <Business fontSize='inherit'/>,
                    to: '/admin/departments',
                  },
                  {
                    label: `${mode === 'add' ? 'Add' : 'Edit'} Department`,
                    icon: mode === 'add' ? <Add fontSize='inherit'/> : <Edit fontSize='inherit'/>,
                    active: true,
                  },
                ]}
              />
            </div>

            <Card style={{ padding: '35px 25px 25px 25px', }}>
              <div>
                <form id='departments-form' onSubmit={handleSubmit(onSubmit)}>
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
                        name='person_in_charge'
                        label='Person in charge'
                        {...register('person_in_charge', { 
                          required: 'Person in charge field is required.',
                        })}
                        defaultValue={selectedRow?.person_in_charge}
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
            </Card>
          </Fragment>
          :
          <Loading/>
        }
      </Fragment>
    }
  </>
}

export default DepartmentsFormPage;