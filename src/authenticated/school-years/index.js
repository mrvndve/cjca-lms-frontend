import { 
  Table,
  ConfirmationDialog,
  Button,
  BreadCrumbs,
} from '../../components';
  
import useSchoolYears from '../../hooks/use-school-years';
  
import { useNavigate } from 'react-router';

import {
  Add,
  Dashboard,
  CalendarMonth,
} from '@mui/icons-material';
  
const SchoolYearsPage = () => {
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
  } = useSchoolYears();

  const navigate = useNavigate();

  return <>
    <div className='mb-4'>
      <BreadCrumbs
        links={[
          {
            label: 'Dashboard',
            icon: <Dashboard fontSize='inherit'/>,
            to: '/admin',
          },
          {
            label: 'School Year',
            icon: <CalendarMonth fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='mb-4' align='right'>
      <Button
        label='Add School Year'
        startIcon={<Add/>}
        size='normal'
        onClick={() => navigate('/admin/school-years/add')}
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
  
export default SchoolYearsPage;