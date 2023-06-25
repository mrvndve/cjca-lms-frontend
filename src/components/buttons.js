import { 
  Button as MUIButton,
  Menu,
  MenuItem,
} from '@mui/material';

import useButton from '../hooks/use-button';

const Button = ({
  className = '',
  style = {},
  label,
  type = '',
  variant = 'contained',
  size = 'large',
  endIcon,
  startIcon,
  color = 'primary',
  disabled,
  onClick,
  component,
  children,
}) => {
  return <>
    <MUIButton
      type={type}
      className={className}
      component={component}
      style={{...{textTransform: 'none'}, ...style}}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      <strong>
        {label}
      </strong>

      {children}
    </MUIButton>
  </>
};

const DropdownButton = ({
  style = {},
  buttonId = 'option-button',
  menuId = 'option-menu',
  label = '',
  variant = 'contained',
  size = 'small',
  endIcon,
  startIcon,
  color = 'primary',
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'right',
  },
  menuItems=[],
  rowData = null,
  onClick,
  onClose,
}) => {
  const {
    open,
    anchor,
    handleClose,
    handleClick,
  } = useButton();

  return <>
    <div>
      <MUIButton
        id={buttonId}
        style={{...{textTransform: 'none'}, ...style}}
        size={size}
        color={color}
        aria-controls={open ? menuId : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant={variant}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={(e) => {
          handleClick(e);
          onClick(e);
        }}
      >
        <strong>
          {label}
        </strong>
      </MUIButton>

      <Menu
        className='shadow'
        id={menuId}
        elevation={10}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        anchorEl={anchor}
        open={open}
        onClose={(e) => {
          handleClose(e);
          onClose(e);
        }}
      >
        {menuItems.length > 0 &&
          menuItems.map((item, i) => (
            <div key={i}>
              <MenuItem
                className='mb-2'
                dense 
                disableRipple
                onClick={(e) => {
                  handleClose(e);

                  if (item.action) {
                    item.action(e, rowData);
                  }
                }}>
                  {item.icon &&
                    <span className='me-2'>
                      {item.icon}
                    </span>
                  }

                  {item.label}
              </MenuItem>
            </div>
          ))
        }
      </Menu>
    </div>
  </>
};

export {
  Button,
  DropdownButton,
};