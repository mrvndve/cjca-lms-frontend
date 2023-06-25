import React, {
  Fragment,
} from 'react';

import useHeader from '../hooks/use-header';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu as MUIMenu,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

import {
  Menu,
  Logout,
  Notifications,
} from '@mui/icons-material';

import {
  ConfirmationDialog,
} from '../components';

import { 
  getUser,
} from '../utils';

import moment from 'moment';
import { isEmpty } from 'lodash';

const NotificationsComponent = ({
  response,
  unreadNotifications,
  handleOpenNotifications,
  handleCloseNotifications,
  handleNotificationsRedirect,
  notificationMenuAnchor,
  isNotificationsOpen,
}) => {
  return <>
    <div>
      <Badge
        id='notification-menu'
        aria-controls={isNotificationsOpen ? 'notification-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isNotificationsOpen ? 'true' : undefined}
        onClick={handleOpenNotifications}
        role='button' 
        badgeContent={unreadNotifications}
        color='error'
      >
        <Notifications/>
      </Badge>

      <MUIMenu
        sx={{
          maxHeight: 600,
        }}
        id='notification-menu'
        anchorEl={notificationMenuAnchor}
        open={isNotificationsOpen}
        onClose={handleCloseNotifications}
      >
        {!isEmpty(response) 
          ?
           response.map((i, index) => (
            <div key={index}>
              <List
                role='button'
                className='notifications'
                sx={{ 
                  width: '100%',
                  maxWidth: 360,
                  minWidth: 360,
                  bgcolor: 
                  'background.paper' 
                }}
                onClick={(e) => handleNotificationsRedirect(e, i)}
                dense
              >
                <ListItem alignItems='flex-start'>
                  <ListItemText
                    primary={
                      <Fragment>
                        <strong>
                          {i.title}
                        </strong>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ 
                            display: 'inline' 
                          }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        />
                        
                        {i.message.replace(/(.{100})..+/, "$1…")}
  
                        <div className='mt-3'>
                          {`${moment(i.created_at).fromNow()}`}
                        </div>
                      </Fragment>
                    }
                  />
                </ListItem>
  
                <Divider component='li' />
              </List>
            </div>
          ))
          :
          <List
            sx={{ 
              width: '100%',
              maxWidth: 360,
              minWidth: 360,
              bgcolor: 
              'background.paper' 
            }}
            dense
          >
            <ListItem alignItems='flex-start'>
              <ListItemText
                primary={
                  <div align='center'>
                    <span style={{ fontWeight: 'bold', }}>
                      No notifications found
                    </span>
                  </div>
                }
              />
            </ListItem>
          </List>
        }
      </MUIMenu>
    </div>
  </>
};

const Header = ({
  handleDrawerToggle,
  drawerWidth,
}) => {
  const {
    handleOpenDialog,
    handleClose,
    handleYes,
    openDialog,
    response,
    unreadNotifications,
    handleOpenNotifications,
    handleCloseNotifications,
    handleNotificationsRedirect,
    notificationMenuAnchor,
    isNotificationsOpen,
  } = useHeader();
  return <>
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{
          bgcolor: 'white',
          color: 'black',
        }}
        variant='dense'
      >
        {/* Mobile View */}
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu/>
        </IconButton>

        <Typography
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { sm: 'none' } }}
        >
          <strong>
            CJCA
          </strong>
        </Typography>

        {/* Web View */}
        <Typography
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <strong>
            Christ Jeross Christian Academy
          </strong>
        </Typography>

        {(getUser().role === 'STUDENT' || getUser().role === 'TEACHER') &&
          <div className='me-3'>
            <NotificationsComponent {...{
              response,
              unreadNotifications,
              handleOpenNotifications,
              handleCloseNotifications,
              handleNotificationsRedirect,
              notificationMenuAnchor,
              isNotificationsOpen,
            }}/>
          </div>
        }

        <div role='button' onClick={handleOpenDialog}>
          <strong className='me-2'>
            Sign Out
          </strong>

          <Logout fontSize='inherit' />
        </div>
      </Toolbar>
    </AppBar>

    <ConfirmationDialog {...{
      open: openDialog,
      title: 'Sign Out',
      message: 'Are you sure you want to sign out your account?',
      handleClose,
      handleYes,
    }}/>
  </>
};

export default Header;