import { 
  Table,
  ConfirmationDialog,
  Button,
  BreadCrumbs,
} from '../../components';
  
import useAnnouncements from '../../hooks/use-announcements';
  
import { useNavigate } from 'react-router';

import {
  Add,
  Announcement,
  Dashboard,
} from '@mui/icons-material';

import {
  getUser,
} from '../../utils';
  
const AnnouncementsPage = () => {
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectRow,
    handleSelectAllRow,
    handleClickAction,
    handleClose,
    handleYes,
    loading,
    rows,
    total,
    page,
    rowsPerPage,
    selected,
    tableHeaders,
    tableData,
    openDialog,
    dialogTitle,
    dialogMessage,
  } = useAnnouncements();

  const navigate = useNavigate();

  return <>
    <div className='mb-4'>
      <BreadCrumbs
        links={[
          {
            label: 'Dashboard',
            icon: <Dashboard fontSize='inherit'/>,
            to: `/${getUser().role.toLowerCase()}`,
          },
          {
            label: 'Announcement',
            icon: <Announcement fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='mb-4' align='right'>
      <Button
        label='Add Announcement'
        startIcon={<Add/>}
        size='normal'
        onClick={() => navigate(`/${getUser().role.toLowerCase()}/announcements/add`)}
      />
    </div>

    <div>
      <Table {...{
        rows,
        tableHeaders,
        tableData,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSelectRow,
        handleSelectAllRow,
        handleClickAction,
        page,
        rowsPerPage,
        selected,
        loading,
        total
      }}/>

      <ConfirmationDialog {...{
        open: openDialog,
        title: dialogTitle,
        message: dialogMessage,
        handleClose,
        handleYes,
      }}/>
    </div>
  </>
}
  
export default AnnouncementsPage;