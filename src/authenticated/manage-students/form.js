import React, { 
  Fragment,
} from 'react';

import useManageStudentsForm from '../../hooks/use-manage-students-form';

import { 
  TextField,
  DateField,
  SelectField,
  Button,
  CheckBoxField,
  BreadCrumbs,
  Card,
  Loading,
} from '../../components';

import { 
  numbersOnly,
  emailOnly,
  getUser,
  apiDomain,
} from '../../utils';

import {
  Dashboard,
  Backpack,
  Add,
  Edit,
} from '@mui/icons-material';

import {
  Avatar,
} from '@mui/material';

import { 
  isEmpty, 
} from 'lodash';

const ManageStudentsFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    sections,
    selectedRow,
    schoolYears,
    gradeLevels,
    strandCourses,
    handleGradeLevelChange,
    isSeniorHigh,
    handleUploadProfile,
    profile,
    defaultSchoolYear,
  } = useManageStudentsForm();

  return <>
    {(mode === 'add' || mode === 'edit') &&
      <Fragment>
        <div className='mb-4'>
          <BreadCrumbs
            links={[
              {
                label: 'Dashboard',
                icon: <Dashboard fontSize='inherit'/>,
                to: `/${getUser().role.toLowerCase()}`,
              },
              {
                label: 'Student',
                icon: <Backpack fontSize='inherit'/>,
                to: `/${getUser().role.toLowerCase()}/manage-students`,
              },
              {
                label: `${mode === 'add' ? 'Add' : 'Edit'} Student`,
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
              <form id='students-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4' align='center'>
                  <div className='mb-3'>
                    <Avatar
                      sx={{
                        width: 130,
                        height: 130,
                      }}
                      alt=''
                      src={isEmpty(profile) ? (selectedRow ? `${apiDomain}/uploads/${selectedRow.image}` : '') : profile.base64}
                    />
                  </div>

                  <Button
                    label='Choose Photo'
                    component='label'
                  >
                    <input 
                      hidden 
                      accept='image/*' 
                      type='file'
                      onChange={(e) => handleUploadProfile(e)}
                    />
                  </Button>
                </div>

                <div className='row g-4'>
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <SelectField
                      name='section_id'
                      label='Section'
                      hasQuickAdd={getUser().role === 'ADMIN' ? true : false}
                      quickAddPath='/admin/sections'
                      options={sections.map(data => ({
                        label: data.name,
                        value: data.id,
                      }))}
                      {...register('section_id', {
                        required: 'Section field is required.'
                      })}
                      defaultValue={selectedRow?.section_id}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <SelectField
                      name='school_year_id'
                      label='School Year'
                      hasQuickAdd={getUser().role === 'ADMIN' ? true : false}
                      quickAddPath='/admin/school-years'
                      options={schoolYears.map(data => ({
                        label: data.name,
                        value: data.id,
                      }))}
                      {...register('school_year_id', {
                        required: 'School year field is required.'
                      })}
                      defaultValue={selectedRow?.school_year_id}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <SelectField
                      name='grade_level_id'
                      label='Grade Level'
                      hasQuickAdd={getUser().role === 'ADMIN' ? true : false}
                      quickAddPath='/admin/grade-levels'
                      options={gradeLevels.map(data => ({
                        label: data.name,
                        value: data.id,
                      }))}
                      {...register('grade_level_id', {
                        required: 'Grade level field is required.'
                      })}
                      onChange={handleGradeLevelChange}
                      defaultValue={selectedRow?.grade_level_id}
                      errors={fieldErrors}
                    />
                  </div>

                  {isSeniorHigh &&
                    <Fragment>
                      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                        <SelectField
                          name='strand_course_id'
                          label='Strand Course'
                          hasQuickAdd={getUser().role === 'ADMIN' ? true : false}
                          quickAddPath='/admin/strand-courses'
                          options={strandCourses.map(data => ({
                            label: data.name,
                            value: data.id,
                          }))}
                          {...register('strand_course_id', {
                            required: 'Strand course field is required.'
                          })}
                          defaultValue={selectedRow?.strand_course_id}
                          errors={fieldErrors}
                        />
                      </div>

                      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                        <SelectField
                          name='semester'
                          label='Semester'
                          options={[
                            {label: '1st Semester', value: '1st Semester'},
                            {label: '2nd Semester', value: '2nd Semester'}
                          ]}
                          {...register('semester', {
                            required: 'Semester field is required.'
                          })}
                          defaultValue={selectedRow?.semester}
                          errors={fieldErrors}
                        />
                      </div>
                    </Fragment>
                  }
                  
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
                      name='email'
                      label='Email'
                      {...register('email', { 
                        required: 'Email field is required.', 
                        pattern: { 
                          value: emailOnly, 
                          message: 'Email field format is incorrect.' 
                        } 
                      })}
                      defaultValue={selectedRow?.email}
                      errors={fieldErrors}
                    />
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='first_name'
                      label='First Name'
                      {...register('first_name', { 
                        required: 'First Name field is required.',
                      })}
                      defaultValue={selectedRow?.first_name}
                      errors={fieldErrors}
                    />
                  </div>
    
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='middle_name'
                      label='Middle Name (Optional)'
                      {...register('middle_name')}
                      defaultValue={selectedRow?.middle_name}
                      errors={fieldErrors}
                    />
                  </div>
    
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='last_name'
                      label='Last Name'
                      {...register('last_name', { 
                        required: 'Last Name field is required.',
                      })}
                      defaultValue={selectedRow?.last_name}
                      errors={fieldErrors}
                    />
                  </div>
    
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='suffix'
                      label='Suffix (Optional)'
                      {...register('suffix')}
                      defaultValue={selectedRow?.suffix}
                      errors={fieldErrors}
                    />
                  </div>
    
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <SelectField
                      name='gender'
                      label='Gender'
                      options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                      ]}
                      {...register('gender', {
                        required: 'Gender field is required.'
                      })}
                      defaultValue={selectedRow?.gender}
                      errors={fieldErrors}
                    />
                  </div>
    
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='contact'
                      label='Contact'
                      {...register('contact', { 
                        required: 'Contact field is required.',
                        pattern: {
                          value: numbersOnly,
                          message: 'Contact field must be numbers only.'
                        }
                      })}
                      defaultValue={selectedRow?.contact}
                      errors={fieldErrors}
                    />
                  </div>
    
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='address'
                      label='Address'
                      {...register('address', { 
                        required: 'Address field is required.'
                      })}
                      defaultValue={selectedRow?.address}
                      errors={fieldErrors}
                    />
                  </div>
              
                  <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <CheckBoxField
                      name='is_active'
                      label='Active'
                      {...register('is_active')}
                      defaultChecked={selectedRow ? (selectedRow.is_active == '1' || selectedRow.is_active == 1) : true}
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

export default ManageStudentsFormPage;