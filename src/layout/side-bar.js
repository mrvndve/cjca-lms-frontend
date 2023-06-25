import React, {
  Fragment,
} from 'react';

import { 
  useNavigate,
} from 'react-router';

import useSideBar from '../hooks/use-side-bar';

import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@mui/material';

import {
  Person,
} from '@mui/icons-material';

import { 
  apiDomain, 
} from '../utils';

const DrawerItems = ({
  sideBarItems,
  user,
}) => {
  const navigate = useNavigate();

  const {
    full_name,
    email,
    role,
    image
  } = user;

  return <>
    <div>
      <List>
        <div style={{ padding: 10, wordBreak: 'break-word' }} align='center'>
          <div className='mb-3'>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80 
              }}
              alt=''
              src={image ? `${apiDomain}/uploads/${image}` : ''}
            >
              <Person style={{ fontSize: 60 }}/>
            </Avatar>
          </div>

          <div className='mb-2'>
            <span>
              {role}
            </span>
          </div>

          <div className='mb-2'>
            <strong>
              {full_name}
            </strong>
          </div>

          <div className='mb-2'>
            <span>
              {email}
            </span>
          </div>
        </div>

        <hr className='m-1'/>
        
        {sideBarItems && sideBarItems.map((data, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton onClick={() => navigate(data.path)}>
              <ListItemIcon>
                {data.icon}
              </ListItemIcon>
              
              <ListItemText primary={<strong>{data.label}</strong>}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  </>
};

const SideBar = ({
  handleDrawerToggle,
  mobileOpen,
  drawerWidth,
}) => {
  const {
    sideBarItems,
    getUser,
  } = useSideBar();

  const {
    sidebar_bg_color,
    sidebar_txt_color,
  } = getUser();

  return <>
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none', },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <DrawerItems {...{
          sideBarItems,
          user: getUser(),
        }}/>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
        PaperProps={{
          sx: {
            backgroundColor: sidebar_bg_color,
            color: sidebar_txt_color,
          }
        }}
      >
        <DrawerItems {...{
          sideBarItems,
          user: getUser(),
        }}/>
      </Drawer>
    </Box>
  </>
}

export default SideBar;