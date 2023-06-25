import {
  useState, 
  useEffect
} from 'react';

import axios from 'axios';

import {
  axiosUrl,
  axiosConfig,
  getUser,
} from '../utils';

import { toast } from 'react-toastify';
  
import { 
  Edit,
  Delete,
  Download,
} from '@mui/icons-material';

import { 
  cloneDeep,
  omit,
} from 'lodash'; 
  
import moment from 'moment';
  
import * as XLSX from 'xlsx';
  
import { useNavigate } from 'react-router';
  
const useAnnouncements = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [search, setSearch] = useState('');

  const [searchBy, setSearchBy] = useState('title');

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selected, setSelected] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogTitle, setDialogTitle] = useState('');

  const [dialogMessage, setDialogMessage] = useState('');

  const navigate = useNavigate();

  const fetchAnnouncements = async () => {
    setLoading(true);

    await axios.get(`${axiosUrl}/announcement/fetch`, axiosConfig)
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

  const handleClickAction = () => {
    setSelected([]);
  }

  const handleOpenDialog = (title, mode, data = null) => {
    setOpenDialog(true);

    setDialogTitle(title);

    setDialogMessage(`Are you sure you want to ${title} the selected row/s.`);

    if (mode === 'single') {
      setSelected([...selected, data.id]);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  
    setSelected([]);
  };

  const deleteAnnouncements = async () => {
    setLoading(true);
    
    var formData = new FormData();

    formData.append('ids', JSON.stringify(selected));

    formData.append('by_user_id', getUser().id);

    await axios.post(`${axiosUrl}/announcement/delete`, formData, axiosConfig)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data.splice(indexes, 1);
        })

        toast.success(data.message);

        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }

        setLoading(false);
      })
  };

  const exportToCSV = async () => {
    const xlsxData = cloneDeep(response.data);

    const worksheet = XLSX.utils.json_to_sheet(xlsxData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `StrandCourses-${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
  }

  const handleYes = () => {
    if (dialogTitle === 'Delete') {
      deleteAnnouncements();
    }
  };

  const tableData = [
    {
      id: 'id',
      key: 'id',
      label: 'Id'
    },
    {
      id: 'title',
      key: 'title',
      label: 'Title'
    },
    {
      id: 'content',
      key: 'content',
      label: 'Content'
    },
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
    {
      id: 'action',
      label: 'Actions',
      actionItems: getUser().role === 'ADMIN' ? [
        { 
          icon: <Edit color='primary'/>,
          label: 'Edit', 
          action: (e, rowData) => navigate(`/${getUser().role.toLowerCase()}/announcements/edit`, { state: rowData }),
        },
        { 
          icon: <Delete color='error'/>,
          label: 'Delete', 
          action: (e, rowData) => handleOpenDialog('Delete', 'single', rowData),
        },
      ] : [
        { 
          icon: <Edit color='primary'/>,
          label: 'Edit', 
          action: (e, rowData) => navigate(`/${getUser().role.toLowerCase()}/announcements/edit`, { state: rowData }),
        },
      ]
    },
  ];

  const tableHeaders = {
    actionsButtons: getUser().role === 'ADMIN' ? [
      {
        icon: <Delete/>,
        color: 'error',
        label: 'Delete',
        disabled: selected.length === 0,
        onClick: () => handleOpenDialog('Delete', 'multiple', null),
      },
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(),
      },
    ] : [
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(),
      },
    ],
    searchByOptions: [
      {
        label: 'Title',
        value: 'title',
      },
    ],
    handleSearch: (e) => {
      setSearch(e.target.value)
    },
    handleSearchBy: (e) => {
      setSearchBy(e.target.value)
    },
  };

  // Did Mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Did Update
  useEffect(() => {
    fetchAnnouncements();
  }, [search, searchBy])

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectRow,
    handleSelectAllRow,
    handleClickAction,
    handleClose,
    handleYes,
    loading,
    rows: response ? response.data : [],
    total: response ? response.total : 0,
    search,
    searchBy,
    page,
    rowsPerPage,
    selected,
    tableHeaders,
    tableData,
    openDialog,
    dialogTitle,
    dialogMessage,
  };
};

export default useAnnouncements;