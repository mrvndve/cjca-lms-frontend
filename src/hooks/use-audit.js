import {
  useState, 
  useEffect,
} from 'react';

import axios from 'axios';

import {
  axiosUrl,
  axiosConfig,
} from '../utils';

import { toast } from 'react-toastify';
  
import { 
  Download,
} from '@mui/icons-material';

import { 
  cloneDeep,
  omit,
} from 'lodash'; 
  
import moment from 'moment';
  
import * as XLSX from 'xlsx';
  
const useAudit = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [search, setSearch] = useState('');

  const [searchBy, setSearchBy] = useState('full_name');

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selected, setSelected] = useState([]);

  const fetchAudit = async () => {
    setLoading(true);

    await axios.get(`${axiosUrl}/audit/fetch`, axiosConfig)
      .then(({data}) => {
        var filtered = data.data.filter(data => {
          return data[searchBy].toLowerCase().includes(search.toLowerCase());
        })
    
        setResponse(state => ({...state, data: filtered, status: data.status}));

        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);

        setLoading(false);
      })
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));

    setPage(0);
  };

  const handleSelectRow = (e, id) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllRow = (e, rows) => {
    if (e.target.checked) {
      const newSelected = rows.map((n) => n.id);

      setSelected(newSelected);

      return;
    }

    setSelected([]);
  };

  const exportToCSV = async () => {
    const xlsxData = cloneDeep(response.data);

    const worksheet = XLSX.utils.json_to_sheet(xlsxData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `Audits-${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
  }

  const tableData = [
    {
      id: 'id',
      key: 'id',
      label: 'Id'
    },
    {
      id: 'full_name',
      key: 'full_name',
      label: 'Name'
    },
    {
      id: 'role',
      key: 'role',
      label: 'Role'
    },
    {
      id: 'module',
      key: 'module',
      label: 'Module'
    },
    {
      id: 'activity',
      key: 'activity',
      label: 'Activity'
    },
    // {
    //   id: 'ip_address',
    //   key: 'ip_address',
    //   label: 'IP Address'
    // },
    {
      id: 'created_at',
      key: 'created_at',
      label: 'Created At',
      isDateTime: true,
    },
    {
      id: 'updated_at',
      key: 'updated_at',
      label: 'Updated At',
      isDateTime: true,
    },
  ];

  const tableHeaders = {
    actionsButtons: [
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(),
      },
    ],
    searchByOptions: [
      {
        label: 'Name',
        value: 'full_name',
      },
      {
        label: 'Role',
        value: 'role',
      },
      {
        label: 'Module',
        value: 'module',
      },
      {
        label: 'Activity',
        value: 'activity',
      },
    ],
    handleSearch: (e) => {
      setSearch(e.target.value);
    },
    handleSearchBy: (e) => {
      setSearchBy(e.target.value)
    },
  };

  // Did Mount
  useEffect(() => {
    fetchAudit();
  }, []);

  useEffect(() => {
    fetchAudit()
  }, [search, searchBy]);

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectRow,
    handleSelectAllRow,
    loading,
    rows: response ? response.data : [],
    search,
    searchBy,
    page,
    rowsPerPage,
    selected,
    tableHeaders,
    tableData,
  };
};

export default useAudit;