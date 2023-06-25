import React, { Fragment } from 'react';

import useSectionsForm from '../../hooks/use-sections-form';

import { 
  TextField,
  SelectField,
  Button,
  BreadCrumbs,
  Card,
  Loading,
} from '../../components';

import {
  Dashboard,
  Add,
  Edit,
  Class,
} from '@mui/icons-material';

const SectionsFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    selectedRow,
  } = useSectionsForm();

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
                label: 'Section',
                icon: <Class fontSize='inherit'/>,
                to: '/admin/sections',
              },
              {
                label: `${mode === 'add' ? 'Add' : 'Edit'} Section`,
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
              <form id='section-form' onSubmit={handleSubmit(onSubmit)}>
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

export default SectionsFormPage;