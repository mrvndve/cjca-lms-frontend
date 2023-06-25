import React, {
  forwardRef,
} from 'react';

import useInput from '../hooks/use-input';

import {
  Visibility,
  VisibilityOff,
  Add,
  Upload,
} from '@mui/icons-material'

import { 
  TextField as Input,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';

const TextField = forwardRef(({
  name, 
  label,
  readOnly,
  size = 'small',
  errors = {},
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      fullWidth
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true,
      }}
      inputProps={{
        readOnly: readOnly,
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const TextAreaField = forwardRef(({
  name, 
  label,
  readOnly,
  size = 'small',
  errors = {},
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      fullWidth
      multiline
      rows={4}
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true,
      }}
      inputProps={{
        readOnly: readOnly,
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const UploadField = forwardRef(({
  name, 
  label, 
  size = 'small',
  accept = 'image/*',
  handleUpload,
  errors = {},
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      fullWidth
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true 
      }}
      InputProps={{
        readOnly: true,
        endAdornment: <InputAdornment position='end'>
          <IconButton
            color='primary'
            className='me-2'
            size='small' 
            edge='end'
            component='label'
          >
            <input 
              hidden 
              accept={accept} 
              type='file'
              onChange={handleUpload}
            />

            <Upload/>
          </IconButton>
        </InputAdornment>,
      }}
      helperText={errors[name]?.message}
      readOnly
      ref={ref}
      {...rest}
    />
  </>
});

const DateField = forwardRef(({
  name, 
  label, 
  errors = {},
  size='small',
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      type='date'
      fullWidth
      size={size}
      defaultValue={new Date().toISOString().substring(0, 10)}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true 
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const DateTimeField = forwardRef(({
  name, 
  label, 
  errors = {},
  size='small',
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      type='datetime-local'
      fullWidth
      size={size}
      defaultValue={new Date().toISOString().substring(0, 10)}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true 
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

const SelectField = forwardRef(({
  name, 
  label, 
  errors = {},
  options,
  size = 'small',
  hasQuickAdd = false,
  quickAddPath = '',
  fullWidth = true,
  ...rest
}, ref) => {
  return <>
    <Input
      name={name}
      label={label}
      select
      fullWidth={fullWidth}
      size={size}
      error={Boolean(errors[name])}
      InputProps={{
        endAdornment: hasQuickAdd && <InputAdornment position='start'>
          <IconButton
            color='primary'
            className='me-2'
            size='small' 
            onClick={()=>window.open(`${process.env.PUBLIC_URL}${quickAddPath}`,'_blank')}
            edge='start'
          >
            <Add style={{ fontSize: 18 }}/>
          </IconButton>
        </InputAdornment>,
      }}
      InputLabelProps={{ 
        shrink: true 
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    >
      {options && options.map((data, i) => (
        <MenuItem key={i} value={data.value}>
          {data.label}
        </MenuItem>
      ))}
    </Input>
  </>
});

const CheckBoxField = forwardRef(({
  name, 
  label, 
  errors = {},
  defaultChecked,
  ...rest
}, ref) => {
  return <>
    <FormControlLabel 
      label={label}
      control={
        <Checkbox  
          name={name}
          {...rest}
          ref={ref}
          defaultChecked={defaultChecked}
        />
      } 
    />
  </>
});

const Password = forwardRef(({
  name, 
  label, 
  errors = {},
  size='small',
  ...rest
}, ref) => {
  const {
    showPassword,
    togglePassword
  } =  useInput();

  return <>
    <Input
      name={name}
      label={label}
      type={!showPassword ? 'password' : 'text'}
      fullWidth
      size={size}
      error={Boolean(errors[name])}
      InputLabelProps={{ 
        shrink: true,
      }}
      InputProps={{
        endAdornment: <InputAdornment position='end'>
          <IconButton
            onClick={togglePassword}
            edge="end"
          >
            {!showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>,
      }}
      helperText={errors[name]?.message}
      ref={ref}
      {...rest}
    />
  </>
});

export {
  TextField,
  TextAreaField,
  Password,
  DateField,
  DateTimeField,
  SelectField,
  CheckBoxField,
  UploadField,
};