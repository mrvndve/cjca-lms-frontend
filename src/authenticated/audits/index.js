import { 
  Table,
  Button,
  BreadCrumbs,
} from '../../components';
  
import useAudit from '../../hooks/use-audit';
  
import { useNavigate } from 'react-router';

import {
  Dashboard,
  List,
} from '@mui/icons-material';
  
const AuditsPage = () => {
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectRow,
    handleSelectAllRow,
    loading,
    rows,
    page,
    rowsPerPage,
    selected,
    tableHeaders,
    tableData,
  } = useAudit();

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
            label: 'History Logs',
            icon: <List fontSize='inherit'/>,
            active: true,
          },
        ]}
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
        page,
        rowsPerPage,
        selected,
        loading,
      }}/>
    </div>
  </>
}
  
export default AuditsPage;