import ChangePasswordForm from './components/change-password-form';

import ProfileForm from './components/profile-form';

import ThemeForm from './components/themes-form';

import { 
  BreadCrumbs, 
} from '../../components';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { 
  getUser,
} from '../../utils';

import {
  Dashboard,
  Settings,
  Key,
  ExpandMore,
  Person,
  ColorLens,
} from '@mui/icons-material';

const TeacherSettingsPage = () => {
  return <>
    <div className='mb-5'>
      <BreadCrumbs
        links={[
          {
            label: 'Dashboard',
            icon: <Dashboard fontSize='inherit'/>,
            to: `/${getUser().role.toLowerCase()}`,
          },
          {
            label: 'Settings',
            icon: <Settings fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='row'>
      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6'>
        <div className='row g-3'>
          <div className='col-12'>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <span className='me-3'>
                  <Person/>
                </span>

                <strong>
                  Profile
                </strong>
              </AccordionSummary>

              <AccordionDetails style={{ padding: 25 }}>
                <ProfileForm/>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className='col-12'>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <span className='me-3'>
                  <Key/>
                </span>

                <strong>
                  Change Password
                </strong>
              </AccordionSummary>

              <AccordionDetails style={{ padding: 25 }}>
                <ChangePasswordForm/>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className='col-12'>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <span className='me-3'>
                  <ColorLens/>
                </span>

                <strong>
                  Themes
                </strong>
              </AccordionSummary>

              <AccordionDetails style={{ padding: 25 }}>
                <ThemeForm/>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </>
};

export default TeacherSettingsPage;