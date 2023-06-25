import React, { 
  Fragment,
} from 'react';

import { 
  Card,
  Password,
  Button,
  WebContainer,
  MobileContainer,
  TextField,
  Loading,
} from '../components';

import { 
  Avatar, 
} from '@mui/material';

import useLogin from '../hooks/use-login';

import { 
  emailOnly,
} from '../utils';

import '../../src/App.css';

const ResponsiveWrapper = ({ children }) => {
  return <>
    <Fragment>
      <WebContainer>
        <div className='row g-0 h-100'>
          <div className='login-page-background col-sm-12 col-md-8 col-lg-8 col-xl-9'>
            <div
              style={{
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.5
              }}
            >
            </div>

            <div className='d-flex align-items-center justify-content-start h-100 p-5' style={{ position: 'absolute' }}>
              <div>
                <span style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>
                  Welcome to Christ Jeross Christian Academy Inc.
                </span>

                <br/>

                <span style={{ fontSize: 23, fontWeight: 'bold', color: 'white' }}>
                  Learning Management System
                </span>
              </div>
            </div>
          </div>

          <div className='col-sm-12 col-md-4 col-lg-4 col-xl-3' style={{ backgroundColor: 'white' }}>
            <div className='d-flex align-items-center justify-content-center h-100 p-4'>
              {children}
            </div>
          </div>
        </div>
      </WebContainer>

      <MobileContainer>
        <div 
          className='d-flex align-items-center justify-content-center h-100 p-3'             
          style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background/welcome-background.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            position: 'relative',
          }}
        >
          <Card padding={30}>
            {children}
          </Card>
        </div>
      </MobileContainer>
    </Fragment>
  </>
}

const LoginForm = () => {
  const {
    onSubmit,
    handleSubmit,
    register,
    fieldErrors,
    isForgotPassword,
    toggleIsForgotPassword,
    loading,
  } = useLogin();

  return <>
    {!loading
      ?
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row gy-4 gx-0' align='center'>
          <div className='col-12'>
            <Avatar
              sx={{
                width: 150,
                height: 150,
              }}
              alt=''
              src={`${process.env.PUBLIC_URL}/assets/logo/image.png`}
            />
          </div>

          <div className='col-12'>
            <h4>
              {!isForgotPassword ? 'Login' : 'Forgot Password'}
            </h4>
          </div>
          
          {!isForgotPassword 
            ?
            <>
              <div className='col-12'>
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
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <Password
                  name='password'
                  label='Password'
                  {...register('password', { 
                    required: 'Password field is required.', 
                  })}
                  errors={fieldErrors}
                />
              </div>
            </>
            :
            <>
              <div className='col-12'>
                <TextField
                  name='recovery_email'
                  label='Recovery Email'
                  {...register('recovery_email', { 
                    required: 'Recovery email field is required.', 
                    pattern: { 
                      value: emailOnly, 
                      message: 'Recovery email field format is incorrect.' 
                    } 
                  })}
                  errors={fieldErrors}
                />
              </div>
            </>
          }

          <div className='col-12'>
            <Button
              style={{ width: '100%', backgroundColor: '#a50809' }}
              type='submit'
              label={!isForgotPassword ? 'Sign In' : 'Submit'}
            />
          </div>

          <div className='col-12'>
            <div className='row g-0'>
              <div className='col-12' align='right'>
                <span role='button' style={{ textDecoration: 'underline' }} onClick={() => toggleIsForgotPassword()}>
                  {!isForgotPassword ? 'Forgot Password?' : 'Back to login'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
      :
      <Loading/>
    }
  </>
}

const LoginPage = () => {
  return <>
    <div className='login-page-container'>
      <ResponsiveWrapper>
        <LoginForm/>
      </ResponsiveWrapper>
    </div>
  </>
};

export default LoginPage;