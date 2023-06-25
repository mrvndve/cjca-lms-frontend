import React, { 
  Fragment,
} from 'react';

import useSubjectsForm from '../../hooks/use-subjects-form';

import { 
  Button,
  BreadCrumbs,
  Card,
  Loading,
  SelectField,
  TextField,
} from '../../components';

import {
  Dashboard,
  Add,
  Edit,
  Subject,
} from '@mui/icons-material';

import { 
  getUser, 
} from '../../utils';

const SubjectsFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    selectedRow,
    gradeLevels,
    strandCourses,
    schoolYears,
    sections,
    handleGradeLevelChange,
    isSeniorHigh,
    isGrading,
  } = useSubjectsForm();

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
                label: 'Subject',
                icon: <Subject fontSize='inherit'/>,
                to: `/${getUser().role.toLowerCase()}/subjects`,
              },
              {
                label: `${mode === 'add' ? 'Add' : 'Edit'} Subject`,
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
              <form id='subject-form' onSubmit={handleSubmit(onSubmit)}>
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
                      name='grade_level_id'
                      label='Grade Level'
                      hasQuickAdd={true}
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

                  {isGrading &&
                    <Fragment>
                      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                        <SelectField
                          name='grading'
                          label='Grading'
                          options={[
                            {label: '1st Grading', value: '1st Grading'},
                            {label: '2nd Grading', value: '2nd Grading'},
                            {label: '3rd Grading', value: '3rd Grading'},
                            {label: '4th Grading', value: '4th Grading'},
                          ]}
                          {...register('grading', {
                            required: 'Grading field is required.'
                          })}
                          defaultValue={selectedRow?.grading}
                          errors={fieldErrors}
                        />
                      </div>
                    </Fragment>
                  }

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
                    <TextField
                      name='description'
                      label='Description'
                      {...register('description', { 
                        required: 'Description field is required.',
                      })}
                      defaultValue={selectedRow?.description}
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

export default SubjectsFormPage;