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

const useSubjectAssignTeachersForm = ({
  isModalOpen,
  handleClose,
  handleSetAssignedTeachers,
  teacherLists,
}) => {
  const [loading, setLoading] = useState(false);

  const [teachers, setTeachers] = useState([]);

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

  const fetchTeachers = async () => {
    await axios.get(`${axiosUrl}/subject/fetch_teachers?subject_id=${id}`, axiosConfig)
      .then(({data}) => {
        // var filtered = data.data.filter(a => {
        //   if (teacherLists.length > 0) {
        //     return teacherLists.find((b) => {
        //       return a.id !== b.user_id
        //     });
        //   }
        // });
        
        setTeachers(data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
  };

  const onSubmit = async (data, e) => {
    data['by_user_id'] = getUser().id;

    data['subject_id'] = id;
    
    const apiData = data;

    setLoading(true);

    await axios.post(`${axiosUrl}/subject/add_teacher`, apiData, axiosConfig)
      .then(({data}) => {
        handleSetAssignedTeachers(data.data);

        setLoading(false);

        toast.success(data.message);

        reset();

        const teacherIds = [];

        teacherIds.push(apiData.user_id);

        socket.emit("sendNotifications2", {
          teacherIds,
          title: 'Subject',
          message: 'A new subject has been added to your teacher account.',
          type: 'teacher new subject',
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
    if (isModalOpen) {
      reset();
      fetchTeachers();
    }
  }, [isModalOpen]);

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    teachers,
  };
};

export default useSubjectAssignTeachersForm;