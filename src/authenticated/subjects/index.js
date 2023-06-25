import { 
  Table,
  ConfirmationDialog,
  Button,
  BreadCrumbs,
} from '../../components';
  
import useSubjects from '../../hooks/use-subjects';
  
import { useNavigate } from 'react-router';

import {
  Add,
  Dashboard,
  CalendarMonth,
  Subject,
} from '@mui/icons-material';

import { 
  getUser, 
} from '../../utils';
  
const SubjectsPage = () => {
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
  } = useSubjects();

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
            label: 'Subject',
            icon: <Subject fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    {getUser().role === 'ADMIN' &&
      <div className='mb-4' align='right'>
        <Button
          label='Add Subject'
          startIcon={<Add/>}
          size='normal'
          onClick={() => navigate(`/${getUser().role.toLowerCase()}/subjects/add`)}
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
  
export default SubjectsPage;