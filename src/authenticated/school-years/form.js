import React, { Fragment } from 'react';

import useSchoolYearsForm from '../../hooks/use-school-years-form';

import { 
  Button,
  BreadCrumbs,
  Card,
  Loading,
  SelectField,
} from '../../components';

import {
  Dashboard,
  Add,
  Edit,
  CalendarMonth,
} from '@mui/icons-material';

const SchoolYearsFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    selectedRow,
    yearFieldOptions,
  } = useSchoolYearsForm();

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
                label: 'School Year',
                icon: <CalendarMonth fontSize='inherit'/>,
                to: '/admin/school-years',
              },
              {
                label: `${mode === 'add' ? 'Add' : 'Edit'} School Year`,
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
              <form id='school-year-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-4'>
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <SelectField
                      name='name'
                      label='Year'
                      {...register('name', { 
                        required: 'Year field is required.',
                      })}
                      options={yearFieldOptions}
                      defaultValue={selectedRow?.name.substring(0, 4)}
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

export default SchoolYearsFormPage;