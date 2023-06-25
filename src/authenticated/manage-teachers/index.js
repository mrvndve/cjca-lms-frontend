import { 
  Table,
  ConfirmationDialog,
  Button,
  BreadCrumbs,
} from '../../components';
  
import useManageTeachers from '../../hooks/use-manage-teachers';
  
import { useNavigate } from 'react-router';

import {
  Add,
  Dashboard,
  School,
} from '@mui/icons-material';

import { 
  getUser,
} from '../../utils';
  
const ManageTeachersPage = () => {
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
  } = useManageTeachers();

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
            label: 'Teacher',
            icon: <School fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    {getUser().role === 'ADMIN' &&
      <div className='mb-4' align='right'>
        <Button
          label='Add Teacher'
          startIcon={<Add/>}
          size='normal'
          onClick={() => navigate(`/${getUser().role.toLowerCase()}/manage-teachers/add`)}
        />
      </div>
    }

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
  
export default ManageTeachersPage;