import { 
  SketchPicker,
} from 'react-color'

import useThemeForm from '../../../hooks/use-theme-form';

import {
  getUser,
} from '../../../utils';

import { 
  TextField,
  Button,
  Loading,
} from '../../../components';

const ThemeForm = () => {
  const {
    register,
    fieldErrors,
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
  } = useThemeForm();

  const {
    sidebar_bg_color,
    sidebar_txt_color,
  } = getUser();

  const popover = {
    position: 'absolute',
    zIndex: '2',
  }

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  return <>
      {!loading
        ?
        <form id='update-theme-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row g-3'>
            <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6'>
              <TextField
                name='sidebar_bg_color'
                label='Background Color'
                onClick={toggleBgColorPicker}
                {...register('sidebar_bg_color', { 
                  required: 'Background color field is required.',
                })}
                defaultValue={sidebar_bg_color ? sidebar_bg_color : ''}
                readOnly
                errors={fieldErrors}
              />

              {displayBgColorPicker && 
                <div style={popover}>
                <div style={cover} onClick={toggleBgColorPicker}/>
                  <SketchPicker color={bgColor} onChange={bgColorChange}/>
                </div>
              }
            </div>

            <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6'>
              <TextField
                name='sidebar_txt_color'
                label='Text Color'
                onClick={toggleTxtColorPicker}
                {...register('sidebar_txt_color', { 
                  required: 'Text color field is required.',
                })}
                defaultValue={sidebar_txt_color ? sidebar_txt_color : ''}
                readOnly
                errors={fieldErrors}
              />

              {displayTxtColorPicker && 
                <div style={popover}>
                <div style={cover} onClick={toggleTxtColorPicker}/>
                  <SketchPicker color={txtColor} onChange={txtColorChange}/>
                </div>
              }
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <div
                align='center'
                style={{
                  padding: 15,
                  backgroundColor: bgColor,
                }}
              >
                <strong>
                  <span
                    style={{
                      color: txtColor,
                    }}
                  >
                    PREVIEW
                  </span>
                </strong>
              </div>
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-4'>
              <Button
                style={{ width: '100%' }}
                type='submit'
                label='Apply'
              />
            </div>
          </div>
        </form>
        :
        <Loading/>
      }
  </>
};

export default ThemeForm;