import {
  useState,
  useEffect,
} from 'react';

import { useForm } from 'react-hook-form';

import { 
  useNavigate, 
  useParams,
  useLocation,
} from 'react-router';

import axios from 'axios';

import {
  axiosUrl,
  axiosConfig,
  getUser,
} from '../utils';

import { toast } from 'react-toastify';

import { 
  isEmpty,
} from 'lodash';

const useManageTeachersForm = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [schoolYears, setSchoolYears] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [profile, setProfile] = useState({});

  const {
    mode
  } = useParams();

  const {
    state
  } = useLocation();

  const navigate = useNavigate();

  const num = Math.floor(Math.random() * 90000) + 10000;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const fetchSchoolYears = async () => {
    await axios.get(`${axiosUrl}/school_year/fetch`, axiosConfig)
      .then(({data}) => {
        setSchoolYears(data.data)

        setResponse(data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
  };

  const fetchDepartments = async () => {
    await axios.get(`${axiosUrl}/department/fetch`, axiosConfig)
      .then(({data}) => {
        setDepartments(data.data)

        setResponse(data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
  };
  
  const onSubmit = async (data, e) => {
    if (mode == 'add') {
      data['password'] = num;
    } else {
      data['id'] = state.id;
    }

    data['by_user_id'] = getUser().id;

    data['is_active'] = data['is_active'] ? 1 : 0;

    if (!isEmpty(profile)) {
      data['base64'] = profile.base64;
      data['base64_type'] = profile.base64_type;
      data['file_name'] = profile.file_name;
    }

    data['role'] = 'TEACHER';

    setLoading(true);

    await axios.post(`${axiosUrl}/users/${mode === 'add' ? 'insert' : 'update'}`, data, axiosConfig)
      .then(({data}) => {
        setResponse(data);

        setLoading(false);

        toast.success(data.message);

        reset();

        navigate('/admin/manage-teachers');
      })
      .catch((err) => {
        if (err.response.data) {
          setResponse(err.response.data);

          if (err.response.data.validation_errors) {
            Object.entries(err.response.data.validation_errors).forEach(([key, value]) => toast.error(value));
          }
        } else {
          toast.error(err.message);
        }

        setLoading(false);
      })
  };

  const handleUploadProfile = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var base64;

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      reader.onloadend = async function () {
        base64 = reader.result;
  
        const data = {
          file_name: `img - ${Math.floor(Date.now() / 1000)} - ${file.name}`,
          base64: base64,
          base64_type: file.type,
        };
  
        setProfile(data);
      };
      
      reader.readAsDataURL(file);
    } else {
      toast.error('Upload profile accepts image only.');
    }
  };

  const defaultSchoolYear = () => {
    const fullYear = new Date().getFullYear();
    const selectedYear = `${fullYear} - ${fullYear + 1}`;
    const data = schoolYears.find(data => (data.name == selectedYear));
    return data?.id;
  };

  // Did Mount
  useEffect(() => {
    if (mode === 'add') {
      setValue('code', `T-${num}`);
    }

    fetchDepartments();
    
    fetchSchoolYears();
  }, []);

  return {
    mode,
    navigate,
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    response,
    departments,
    selectedRow: state,
    schoolYears,
    handleUploadProfile,
    profile,
    defaultSchoolYear,
  };
};

export default useManageTeachersForm;