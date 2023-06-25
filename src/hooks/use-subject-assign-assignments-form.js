import { 
  useState,
  useEffect,
} from 'react';

import { 
  useForm,
} from 'react-hook-form';

import { 
  useParams,
} from 'react-router';

import axios from 'axios';

import {
  axiosUrl,
  axiosConfig,
  getUser,
  SocketConnect,
} from '../utils';

import { 
  toast,
} from 'react-toastify';

import moment from 'moment';

const useSubjectAssignAssignmentsForm = ({
  isModalOpen,
  handleClose,
  handleSetAssignedAssignments,
}) => {
  const [loading, setLoading] = useState(false);

  const [uploadFiles, setUploadFiles] = useState({});

  const socket = SocketConnect();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const {
    id,
  } = useParams();

  const handleUpload = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var base64;

    reader.onloadend = async function () {
      base64 = reader.result;

      const data = {
        file_name: `homework - ${Math.floor(Date.now() / 1000)} - ${file.name}`,
        base64: base64.replace(`data:${file.type};base64,`, ''),
        base64_type: file.type,
      };

      setValue('upload_file', data.file_name);
      setUploadFiles(data);
    };
    
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data, e) => {    
    data['subject_id'] = id;

    data['by_user_id'] = getUser().id;  

    const apiData = {
      ...data,
      ...uploadFiles,
    };

    if (parseInt(data.passing_score) > parseInt(data.total_points)) {
      toast.error('Passing score field must be less than total points fields.');
      return;
    }
    
    if (moment(data['due_date']).isBefore(moment(new Date().toDateString()))) { 
      toast.error('Due date must be today or a date in the future.');
      return;
    }

    setLoading(true);

    await axios.post(`${axiosUrl}/subject/add_assignment`, apiData, axiosConfig)
      .then(({data}) => {
        handleSetAssignedAssignments(data.data);

        setLoading(false);

        toast.success(data.message);

        reset();

        const userIds = [];

        data.students.map(data => {
          userIds.push(data.id);
        });

        socket.emit("sendNotifications", {
          userIds,
          title: 'New Assignment',
          message: 'A new assignment has been added to your student account.',
          type: 'assignment',
          is_read: 0,
          created_at: new Date(),
        });

        handleClose();
      })
      .catch((err) => {
        toast.error(err.message);

        setLoading(false);
      })
  };

  useEffect(() => {
    reset();
  }, [isModalOpen]);

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    handleUpload,
  };
};

export default useSubjectAssignAssignmentsForm;