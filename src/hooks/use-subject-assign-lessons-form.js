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

const useSubjectAssignLessonsForm = ({
  isModalOpen,
  handleClose,
  handleSetAssignedLessons,
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
        file_name: `lesson - ${Math.floor(Date.now() / 1000)} - ${file.name}`,
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

    setLoading(true);

    await axios.post(`${axiosUrl}/subject/add_lesson`, apiData, axiosConfig)
      .then(({data}) => {
        handleSetAssignedLessons(data.data);

        setLoading(false);

        toast.success(data.message);

        reset();

        const userIds = [];

        data.students.map(data => {
          userIds.push(data.id);
        });
        
        socket.emit("sendNotifications", {
          userIds,
          title: 'New Lesson',
          message: 'A new lesson has been added to your student account.',
          type: 'lesson',
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

export default useSubjectAssignLessonsForm