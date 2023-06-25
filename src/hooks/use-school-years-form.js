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

const useSchoolYearsForm = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [yearFieldOptions, setYearFieldOptions] = useState([]);

  const {
    mode
  } = useParams();

  const {
    state
  } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  
  const onSubmit = async (data, e) => {
    if (mode !== 'add') {
      data['id'] = state.id;
    }

    data['by_user_id'] = getUser().id;

    data['name'] = `${data['name']} - ${data['name'] + 1}`;

    setLoading(true);

    await axios.post(`${axiosUrl}/school_year/${mode === 'add' ? 'insert' : 'update'}`, data, axiosConfig)
      .then(({data}) => {
        setResponse(data);

        setLoading(false);

        toast.success(data.message);

        reset();

        navigate('/admin/school-years');
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

  const handleYearFieldOptions = () => {
    let startYear = new Date().getFullYear() - 2;

    // let endYear = new Date().getFullYear();

    let endYear = 2050;

    var yearOptions = [];

    for (let x = endYear; x > startYear; x--) {
      yearOptions.push({
        label: x,
        value: x
      });
    }

    setYearFieldOptions(yearOptions);
  };

  // Did Mount
  useEffect(() => {
    handleYearFieldOptions();
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
    selectedRow: state,
    yearFieldOptions,
  };
};

export default useSchoolYearsForm;