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
  SocketConnect,
} from '../utils';

import { toast } from 'react-toastify';

const useSubjectsForm = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [gradeLevels, setGradeLevels] = useState([]);

  const [strandCourses, setStrandCourses] = useState([]);

  const [schoolYears, setSchoolYears] = useState([]);

  const [sections, setSections] = useState([]);

  const [isSeniorHigh, setIsSeniorHigh] = useState(false);

  const [isGrading, setIsGrading] = useState(false);

  const {
    mode
  } = useParams();

  const {
    state
  } = useLocation();

  const navigate = useNavigate();

  const num = Math.floor(Math.random() * 90000) + 10000;

  const socket = SocketConnect();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const fetchGradeLevels = async () => {
    await axios.get(`${axiosUrl}/grade_level/fetch`, axiosConfig)
      .then(({data}) => {
        setGradeLevels(data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
  };

  const fetchStrandCourses = async () => {
    await axios.get(`${axiosUrl}/strand_course/fetch`, axiosConfig)
      .then(({data}) => {
        setStrandCourses(data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
  };

  const fetchSchoolYears = async () => {
    await axios.get(`${axiosUrl}/school_year/fetch`, axiosConfig)
      .then(({data}) => {
        setSchoolYears(data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
  };

  const fetchSections = async () => {
    await axios.get(`${axiosUrl}/section/fetch`, axiosConfig)
      .then(({data}) => {
        setSections(data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
  };

  const onSubmit = async (data, e) => {
    if (mode !== 'add') {
      data['id'] = state.id;
    }

    if (!isSeniorHigh) {
      delete data['strand_course_id'];
      delete data['semester'];
    }

    data['by_user_id'] = getUser().id;

    setLoading(true);

    await axios.post(`${axiosUrl}/subject/${mode === 'add' ? 'insert' : 'update'}`, data, axiosConfig)
      .then(({data}) => {
        setResponse(data);

        setLoading(false);

        toast.success(data.message);

        reset();

        if (mode === 'add') {
          const userIds = []

          data.students.map(data => {
            userIds.push(data.id);
          });
  
          socket.emit("sendNotifications", {
            title: 'New Subject',
            message: 'A new subject has been added to your student account.',
            type: 'subject',
            is_read: 0,
            created_at: new Date(),
          });
        }

        navigate(`/${getUser().role.toLowerCase()}/subjects`);
      })
      .catch((err) => {
        if (err.response?.data) {
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

  const handleGradeLevelChange = (e) => {
    const findData = gradeLevels.find((data) => data.id === e.target.value);

    if (findData.is_senior_high == 1) {
      setIsSeniorHigh(true);
      setIsGrading(false);
    } else {
      setIsSeniorHigh(false);
      setIsGrading(true);
    }
  }

  // Did Mount
  useEffect(() => {
    if (mode === 'add') {
      setValue('code', `Subj-${num}`);
    } else {
      if (state?.grade_level?.is_senior_high == 1) {
        setIsSeniorHigh(true);
        setIsGrading(false);
      } else {
        setIsSeniorHigh(false);
        setIsGrading(true);
      }
    }

    fetchStrandCourses();
    fetchGradeLevels();
    fetchSchoolYears();
    fetchSections();
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
    gradeLevels,
    strandCourses,
    schoolYears,
    sections,
    handleGradeLevelChange,
    isSeniorHigh,
    isGrading,
  };
};

export default useSubjectsForm;