import { 
  useState,
  useEffect,
} from 'react';

import { useForm } from 'react-hook-form';

import { 
  axiosUrl,
  axiosConfig,
  getUser,
} from '../utils';

import axios from 'axios';

import { toast } from 'react-toastify';

const useThemeForm = () => {
  const [loading, setLoading] = useState(false);

  const [bgColor, setBgColor] = useState('');

  const [txtColor, setTxtColor] = useState('');

  const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);

  const [displayTxtColorPicker, setDisplayTxtColorPicker] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data['id'] = getUser().id;

    data['by_user_id'] = getUser().id;

    setLoading(true);

    await axios.post(`${axiosUrl}/settings/update_theme`, data, axiosConfig)
      .then(({data}) => {
        localStorage.setItem('user', JSON.stringify(data.data));
        setLoading(false);
        toast.success(data.message);
        reset();
      })
      .catch((err) => {
        toast.error(err.message);

        setLoading(false);
      })

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const toggleBgColorPicker = () => {
    setDisplayBgColorPicker(!displayBgColorPicker);
  }

  const toggleTxtColorPicker = () => {
    setDisplayTxtColorPicker(!displayTxtColorPicker);
  }

  const bgColorChange = (color, e) => {
    setBgColor(color.hex);
    setValue('sidebar_bg_color', color.hex)
  }

  const txtColorChange = (color, e) => {
    setTxtColor(color.hex);
    setValue('sidebar_txt_color', color.hex)
  }

  useEffect(() => {
    setBgColor(getUser().sidebar_bg_color);
    setTxtColor(getUser().sidebar_txt_color);
  }, [])

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    loading,
    bgColor,
    txtColor,
    displayBgColorPicker,
    displayTxtColorPicker,
    toggleBgColorPicker,
    toggleTxtColorPicker,
    bgColorChange,
    txtColorChange,
  };
};

export default useThemeForm;