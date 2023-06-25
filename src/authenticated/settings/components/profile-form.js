import useProfileForm from "../../../hooks/use-profile-form";

import { 
  TextField,
  DateField,
  SelectField,
  Loading, 
  Button,
} from "../../../components";

import { 
  emailOnly,
  numbersOnly,
  apiDomain,
} from "../../../utils";

import {
  Avatar,
} from '@mui/material';

import { 
  isEmpty, 
} from 'lodash';

const ProfileForm = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    response,
    getUser,
    handleUploadProfile,
    profile,
  } = useProfileForm();

  const {
    email,
    first_name,
    middle_name,
    last_name,
    suffix,
    gender,
    contact,
    address,
    image,
  } = getUser();

  return <>
    <div>
      {response?.status === 0 && 
        <div className='mb-4'>
          <span style={{ fontSize: 13, color: '#D32F2F' }}>
            * {response?.message}
          </span>
        </div>
      }

      {!loading
        ?
        <form id='update-profile-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row g-4'>
            <div align='center'>
              <div className='mb-3'>
                <Avatar
                  sx={{
                    width: 130,
                    height: 130,
                  }}
                  alt=''
                  src={isEmpty(profile) ? (image ? `${apiDomain}/uploads/${image}` : '') : profile.base64}
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

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
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
                defaultValue={email ? email : ''}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <TextField
                name='first_name'
                label='First Name'
                {...register('first_name', { 
                  required: 'First Name field is required.',
                })}
                defaultValue={first_name ? first_name : ''}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <TextField
                name='middle_name'
                label='Middle Name (Optional)'
                {...register('middle_name')}
                defaultValue={middle_name ? middle_name : ''}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <TextField
                name='last_name'
                label='Last Name'
                {...register('last_name', { 
                  required: 'Last Name field is required.',
                })}
                defaultValue={last_name ? last_name : ''}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <TextField
                name='suffix'
                label='Suffix (Optional)'
                {...register('suffix')}
                defaultValue={suffix ? suffix : ''}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
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
                defaultValue={gender ? gender : ''}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
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
                defaultValue={contact ? contact : ''}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <TextField
                name='address'
                label='Address'
                {...register('address', { 
                  required: 'Address field is required.'
                })}
                defaultValue={address ? address : ''}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
              <Button
                style={{ width: '100%' }}
                type='submit'
                label='Update Profile'
              />
            </div>
          </div>
        </form>
        :
        <Loading/>
      }
    </div>
  </>
};

export default ProfileForm;