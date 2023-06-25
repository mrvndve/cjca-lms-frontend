import React, { Fragment } from 'react';

import useGradeLevelsForm from '../../hooks/use-grade-levels-form';

import { 
  Button,
  BreadCrumbs,
  Card,
  Loading,
  TextField,
  CheckBoxField,
} from '../../components';

import {
  Dashboard,
  Add,
  Edit,
  Star,
} from '@mui/icons-material';

const GradeLevelsFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    selectedRow,
  } = useGradeLevelsForm();

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
                label: 'Grade Level',
                icon: <Star fontSize='inherit'/>,
                to: '/admin/grade-levels',
              },
              {
                label: `${mode === 'add' ? 'Add' : 'Edit'} Grade Level`,
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
              <form id='grade-level-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-4'>
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='code'
                      label='Code'
                      {...register('code', { 
                        required: 'Code is required.',
                      })}
                      defaultValue={selectedRow?.code}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='name'
                      label='Level'
                      {...register('name', { 
                        required: 'Level is required.',
                      })}
                      defaultValue={selectedRow?.name}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <CheckBoxField
                      name='is_senior_high'
                      label='Senior High'
                      {...register('is_senior_high')}
                      defaultChecked={selectedRow ? (selectedRow.is_senior_high == '1' || selectedRow.is_senior_high == 1) : true}
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

export default GradeLevelsFormPage;