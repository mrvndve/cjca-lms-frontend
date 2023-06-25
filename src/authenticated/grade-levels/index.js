import { 
  Table,
  ConfirmationDialog,
  Button,
  BreadCrumbs,
} from '../../components';
  
import useGradeLevels from '../../hooks/use-grade-levels';
  
import { useNavigate } from 'react-router';

import {
  Add,
  Dashboard,
  Star,
} from '@mui/icons-material';
  
const GradeLevelsPage = () => {
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
  } = useGradeLevels();

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
            label: 'Grade Level',
            icon: <Star fontSize='inherit'/>,
            active: true,
          },
        ]}
      />
    </div>

    <div className='mb-4' align='right'>
      <Button
        label='Add Grade Level'
        startIcon={<Add/>}
        size='normal'
        onClick={() => navigate('/admin/grade-levels/add', { state: { rowsLength: rows.length } })}
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
  
export default GradeLevelsPage;