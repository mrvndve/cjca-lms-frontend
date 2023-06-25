import { 
  Table,
  ConfirmationDialog,
  Button,
  BreadCrumbs,
} from '../../components';
  
import useManageStudents from '../../hooks/use-manage-students';
  
import { 
  useNavigate, 
} from 'react-router';

import {
  Add,
  Dashboard,
  Backpack,
} from '@mui/icons-material';

import { 
  getUser,
} from '../../utils';
  
const ManageStudentsPage = () => {
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
    page,
    rowsPerPage,
    selected,
    tableHeaders,
    tableData,
    openDialog,
    dialogTitle,
    dialogMessage,
  } = useManageStudents();

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
            label: 'Student',
            icon: <Backpack fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='mb-4' align='right'>
      <Button
        label='Add Student'
        startIcon={<Add/>}
        size='normal'
        onClick={() => navigate(`/${getUser().role.toLowerCase()}/manage-students/add`)}
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
  
export default ManageStudentsPage;