import { 
  Password,
  Button,
  Loading,
} from '../../../components';

import useChangePasswordForm from '../../../hooks/use-change-password-form';

const ChangePasswordForm = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    loading,
    fieldErrors,
    response,
  } = useChangePasswordForm();

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
        <form id='change-password-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row g-4'>
            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <Password
                name='old_password'
                label='Old Password'
                {...register('old_password', { 
                  required: 'Old password field is required.', 
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <Password
                name='new_password'
                label='New Password'
                {...register('new_password', { 
                  required: 'New password field is required.', 
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <Password
                name='confirm_password'
                label='Confirm Password'
                {...register('confirm_password', { 
                  required: 'Confirm password field is required.', 
                })}
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
                label='Update Password'
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

export default ChangePasswordForm;