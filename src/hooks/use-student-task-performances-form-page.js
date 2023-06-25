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

import { 
  isEmpty,
} from 'lodash';

const useStudentTaskPerformancesForm = ({
  selected,
  toggleModal,
  fetchSubjectDetails,
}) => {
  const [loading, setLoading] = useState(false);

  const [uploadedFile, setUploadedFile] = useState({});

  const socket = SocketConnect();

  const handleUpload = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var base64;

    reader.onloadend = async function () {
      base64 = reader.result;

      const data = {
        file_name: `submitted - ${Math.floor(Date.now() / 1000)} - ${file.name}`,
        base64: base64,
        base64_type: file.type,
      };

      setValue('upload_file', data.file_name);
      setUploadedFile(data);
    };
    
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    data['user_id'] = getUser().id;

    data['task_performance_id'] = selected.id;

    const teacherIds = [];

    selected?.teachers.map(data => {
      teacherIds.push(data.id);
    });

    if (!isEmpty(uploadedFile)) {
      const {
        base64,
        base64_type,
        file_name,
      } = uploadedFile;

      data['base64'] = base64;
      data['base64_type'] = base64_type;
      data['file_name'] = file_name;
    }

    const apiData = {
      user: getUser().full_name,
      teacher_ids: JSON.stringify(teacherIds),
      ...data
    };

    setLoading(true);

    await axios.post(`${axiosUrl}/student/submit_task_performance`, apiData, axiosConfig)
      .then(({data}) => {
        socket.emit("sendNotifications2", {
          teacherIds,
          title: 'Task Performance',
          message: `${apiData.user} submitted a task performance.`,
          type: 'teacher task performance',
          is_read: 0,
          created_at: new Date(),
        });

        toast.success(data.message);

        reset();

        setLoading(false);

        toggleModal();

        fetchSubjectDetails();
      })
      .catch((err) => {
        toast.error(err.message);
  
        setLoading(false);
      })
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    handleUpload,
  };
};

export default useStudentTaskPerformancesForm;