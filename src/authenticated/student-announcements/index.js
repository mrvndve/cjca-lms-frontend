import {
  Fragment,
} from 'react';

import { 
  BreadCrumbs,
  Loading,
  EmptyBanner,
} from '../../components';

import {
  Dashboard,
  Announcement,
} from '@mui/icons-material';

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';

import { 
  isEmpty, 
} from 'lodash';

import moment from 'moment';

import {
  apiDomain,
} from '../../utils';

import useStudentAnnouncementPage from '../../hooks/use-student-announcement-page';

const StudentsAnnouncementPage = () => {
  const {
    response,
    loading,
  } = useStudentAnnouncementPage();

  return <>
    <div className='mb-4'>
      <BreadCrumbs
        links={[
          {
            label: 'Dashboard',
            icon: <Dashboard fontSize='inherit'/>,
            to: '/student',
          },
          {
            label: 'Announcement',
            icon: <Announcement fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    {!loading
      ?
      <div>
        {!isEmpty(response)
          ?
          <div className='row g-4'>
            {response.map((data, index) => (
              <Fragment key={index}>
                <div className='col-12'>
                  <Card
                    style={{ padding: 10, }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar alt='' src={`${apiDomain}/uploads/${data.author.image}`}/>
                      }
                      title={<strong>{data.title}</strong>}
                      subheader={
                        <Fragment>
                          <div>
                            {`Author: ${data.author.full_name}`}
                          </div>

                          <div>
                            {moment(data.created_at).fromNow()}
                          </div>
                        </Fragment>
                      }
                    />

                    <CardContent>
                      {data.content}
                    </CardContent>
                  </Card>
                </div>
              </Fragment>
            ))}
          </div>
          :
          <EmptyBanner/>
        }
      </div>
      :
      <Loading/>
    }
  </>
};

export default StudentsAnnouncementPage;