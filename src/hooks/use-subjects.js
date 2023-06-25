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
  Settings,
} from '@mui/icons-material';

import { 
  cloneDeep,
  omit,
} from 'lodash'; 
  
import moment from 'moment';
  
import * as XLSX from 'xlsx';
  
import { useNavigate } from 'react-router';
  
const useSubjects = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [search, setSearch] = useState('');

  const [searchBy, setSearchBy] = useState('name');

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selected, setSelected] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogTitle, setDialogTitle] = useState('');

  const [dialogMessage, setDialogMessage] = useState('');

  const navigate = useNavigate();

  const fetchSubjects = async () => {
    setLoading(true);

    const url = getUser().role === 'ADMIN' ? `${axiosUrl}/subject/fetch` : `${axiosUrl}/subject/fetch_teacher_subjects?user_id=${getUser().id}`

    await axios.get(url, axiosConfig)
      .then(({data}) => {
        var filtered = data.data.filter(data => {
          if (searchBy === 'school_year' || searchBy === 'grade_level' || searchBy === 'section') {
            return data[searchBy]['name'].toLowerCase().includes(search.toLowerCase());
          }

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

  const deleteSchoolYears = async () => {
    setLoading(true);
    
    var formData = new FormData();

    formData.append('ids', JSON.stringify(selected));

    formData.append('by_user_id', getUser().id);

    await axios.post(`${axiosUrl}/subject/delete`, formData, axiosConfig)
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
    XLSX.writeFile(workbook, `Subjects-${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
  }

  const handleYes = () => {
    if (dialogTitle === 'Delete') {
      deleteSchoolYears();
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
      id: 'name',
      key: 'name',
      label: 'Name'
    },
    {
      id: 'school_year',
      key: 'school_year',
      label: 'S & Y',
      isObject: true,
      objectDisplay: 'name',
    },
    {
      id: 'section',
      key: 'section',
      label: 'For Section',
      isObject: true,
      objectDisplay: 'name',
    },
    {
      id: 'grade_level',
      key: 'grade_level',
      label: 'Level',
      isObject: true,
      objectDisplay: 'name',
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
          action: (e, rowData) => navigate(`/${getUser().role.toLowerCase()}/subjects/edit`, { state: rowData }),
        },
        { 
          icon: <Delete color='error'/>,
          label: 'Delete', 
          action: (e, rowData) => handleOpenDialog('Delete', 'single', rowData),
        },
        { 
          icon: <Settings color='primary'/>,
          label: 'Manage Subject', 
          action: (e, rowData) => navigate(`/${getUser().role.toLowerCase()}/subjects/manage/${rowData.id}`, { state: rowData }),
        },
      ] : [
        { 
          icon: <Settings color='primary'/>,
          label: 'Manage Subject', 
          action: (e, rowData) => navigate(`/${getUser().role.toLowerCase()}/subjects/manage/${rowData.id}`, { state: rowData }),
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
    ]
    ,
    searchByOptions: [
      {
        label: 'Code',
        value: 'code',
      },
      {
        label: 'Name',
        value: 'name',
      },
      {
        label: 'School Year',
        value: 'school_year',
      },
      {
        label: 'Grade Level',
        value: 'grade_level',
      },
      {
        label: 'Section',
        value: 'section',
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
    fetchSubjects();

    return () => {
    };
  }, []);

  // Did Update
  useEffect(() => {
    fetchSubjects();
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

export default useSubjects;