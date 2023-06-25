import React, { Fragment } from 'react';

import useManageAdminsForm from '../../hooks/use-manage-admins-form';

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
  apiDomain,
} from '../../utils';

import {
  Dashboard,
  AdminPanelSettings,
  Add,
  Edit,
} from '@mui/icons-material';

import {
  Avatar,
} from '@mui/material';

import { 
  isEmpty, 
} from 'lodash';

const ManageAdminsFormPage = () => {
  const {
    mode,
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    loading,
    selectedRow,
    handleUploadProfile,
    profile,
  } = useManageAdminsForm();

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
                label: 'Admin',
                icon: <AdminPanelSettings fontSize='inherit'/>,
                to: '/admin/manage-admins',
              },
              {
                label: `${mode === 'add' ? 'Add' : 'Edit'} Admin`,
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
              <form id='admins-form' onSubmit={handleSubmit(onSubmit)}>
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

export default ManageAdminsFormPage;