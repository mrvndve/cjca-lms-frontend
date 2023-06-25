import { 
  Table,
  ConfirmationDialog,
  Button,
  BreadCrumbs,
} from '../../components';
  
import useStrandCourses from '../../hooks/use-strand-courses';
  
import { useNavigate } from 'react-router';

import {
  Add,
  Dashboard,
  GolfCourse,
} from '@mui/icons-material';
  
const StrandCoursesPage = () => {
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
  } = useStrandCourses();

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
            label: 'Strand Course',
            icon: <GolfCourse fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='mb-4' align='right'>
      <Button
        label='Add Strand Course'
        startIcon={<Add/>}
        size='normal'
        onClick={() => navigate('/admin/strand-courses/add')}
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
  
export default StrandCoursesPage;