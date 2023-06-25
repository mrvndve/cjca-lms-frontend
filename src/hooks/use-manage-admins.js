import {
  useState, 
  useEffect,
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
  Lock,
  LockOpen,
  LockReset,
  Download,
} from '@mui/icons-material';

import { 
  cloneDeep,
  omit,
} from 'lodash'; 
  
import moment from 'moment';
  
import * as XLSX from 'xlsx';
  
import { useNavigate } from 'react-router';
  
const useManageAdmins = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [search, setSearch] = useState('');

  const [searchBy, setSearchBy] = useState('code');

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selected, setSelected] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogTitle, setDialogTitle] = useState('');

  const [dialogMessage, setDialogMessage] = useState('');

  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);

    await axios.get(`${axiosUrl}/users/fetch?role=admin`, axiosConfig)
      .then(({data}) => {
        const user = JSON.parse(localStorage.getItem('user'));

        const index = data.data.findIndex((data) => data.id == user.id);

        if (index !== -1) {
          data.data.splice(index, 1);
        }

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

  const deleteUser = async () => {
    setLoading(true);
    
    var formData = new FormData();

    formData.append('ids', JSON.stringify(selected));

    formData.append('role', 'ADMIN');

    formData.append('by_user_id', getUser().id);

    await axios.post(`${axiosUrl}/users/delete`, formData, axiosConfig)
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

  const lockUser = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append('ids', JSON.stringify(selected));

    formData.append('is_active', 0);

    formData.append('role', 'ADMIN');

    formData.append('by_user_id', getUser().id);

    await axios.post(`${axiosUrl}/users/activate_deactive`, formData, axiosConfig)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data[indexes]['is_active'] = 0;
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

  const unlockUser = async () => {
    setLoading(true);
    
    const formData = new FormData();

    formData.append('ids', JSON.stringify(selected));

    formData.append('is_active', 1);

    formData.append('role', 'ADMIN');

    formData.append('by_user_id', getUser().id);

    await axios.post(`${axiosUrl}/users/activate_deactive`, formData, axiosConfig)
      .then(({data}) => {
        selected.map((data) => {
          let indexes = response.data.findIndex((i) => i.id === data)
          response.data[indexes]['is_active'] = 1;
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

  const resetPassword = async () => {
    setLoading(true);

    var formData = new FormData();

    formData.append('ids', JSON.stringify(selected));

    formData.append('role', 'ADMIN');

    formData.append('by_user_id', getUser().id);

    await axios.post(`${axiosUrl}/users/reset_password`, formData, axiosConfig)
    .then(({data}) => {
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
    XLSX.writeFile(workbook, `Admins-${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
  }

  const handleYes = () => {
    if (dialogTitle === 'Delete') {
      deleteUser();
    } else if (dialogTitle === 'Deactivate') {
      lockUser();
    } else if (dialogTitle === 'Activate') {
      unlockUser();
    } else if (dialogTitle === 'Reset Password') {
      resetPassword();
    }
  };

  const tableData = [
    {
      id: 'id',
      key: 'id',
      label: 'Id'
    },
    {
      id: 'code',
      key: 'code',
      label: 'Code'
    },
    {
      id: 'full_name',
      key: 'full_name',
      label: 'Name'
    },
    {
      id: 'email',
      key: 'email',
      label: 'Email'
    },
    {
      id: 'address',
      key: 'address',
      label: 'Address'
    },
    {
      id: 'contact',
      key: 'contact',
      label: 'Contact'
    },
    {
      id: 'role',
      key: 'role',
      label: 'Role'
    },
    {
      id: 'is_active',
      key: 'is_active',
      label: 'Active',
      isBoolean: true,
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
      actionItems: [
        { 
          icon: <Edit color='primary'/>,
          label: 'Edit', 
          action: (e, rowData) => navigate('/admin/manage-admins/edit', { state: rowData }),
        },
        { 
          icon: <Delete color='error'/>,
          label: 'Delete', 
          action: (e, rowData) => handleOpenDialog('Delete', 'single', rowData),
        },
        { 
          icon: <Lock color='primary'/>,
          label: 'Deactivate', 
          action: (e, rowData) => handleOpenDialog('Deactivate', 'single', rowData),
        },
        { 
          icon: <LockOpen color='primary'/>,
          label: 'Activate', 
          action: (e, rowData) => handleOpenDialog('Activate', 'single', rowData),
        },
        { 
          icon: <LockReset color='success'/>,
          label: 'Reset', 
          action: (e, rowData) => handleOpenDialog('Reset Password', 'single', rowData),
        }
      ]
    },
  ];

  const tableHeaders = {
    actionsButtons: [
      {
        icon: <Delete/>,
        color: 'error',
        label: 'Delete',
        disabled: selected.length === 0,
        onClick: () => handleOpenDialog('Delete', 'multiple', null),
      },
      {
        icon: <Lock/>,
        color: 'primary',
        label: 'Deactivate',
        disabled: selected.length === 0,
        onClick: () => handleOpenDialog('Deactivate', 'multiple', null),
      },
      {
        icon: <LockOpen/>,
        color: 'primary',
        label: 'Activate',
        disabled: selected.length === 0,
        onClick: () => handleOpenDialog('Activate', 'multiple', null),
      },
      {
        icon: <LockReset/>,
        color: 'primary',
        label: 'Reset',
        disabled: selected.length === 0,
        onClick: () => handleOpenDialog('Reset Password', 'multiple', null),
      },
      {
        icon: <Download/>,
        color: 'success',
        label: 'Export',
        onClick: () => exportToCSV(),
      },
    ],
    searchByOptions: [
      {
        label: 'Code',
        value: 'code',
      },
      {
        label: 'Name',
        value: 'full_name',
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
    fetchUsers();
  }, []);

  // Did Update
  useEffect(() => {
    fetchUsers();
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

export default useManageAdmins;