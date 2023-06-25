import { 
  useState 
} from 'react';

import { useForm } from 'react-hook-form';

import { 
  axiosUrl,
  axiosConfig,
  getUser,
} from '../utils';

import axios from 'axios';

import { toast } from 'react-toastify';

import { 
  isEmpty, 
} from 'lodash';

const useProfileForm = () => {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const [profile, setProfile] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data['id'] = getUser().id;

    data['by_user_id'] = getUser().id;

    if (!isEmpty(profile)) {
      data['base64'] = profile.base64;
      data['base64_type'] = profile.base64_type;
      data['file_name'] = profile.file_name;
    }

    setLoading(true);

    await axios.post(`${axiosUrl}/settings/update_profile`, data, axiosConfig)
      .then(({data}) => {
        setResponse(data);
        localStorage.setItem('user', JSON.stringify(data.data));
        setLoading(false);
        toast.success(data.message);
        reset();
      })
      .catch((err) => {
        setResponse(err.response?.data);
        setLoading(false);
      })

      setTimeout(() => {
        window.location.reload();
      }, 1000);
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

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    response,
    getUser,
    handleUploadProfile,
    profile,
  };
};

export default useProfileForm;