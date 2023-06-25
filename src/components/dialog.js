import {
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ConfirmationDialog = ({
  open,
  title = 'Title',
  message = 'Message',
  handleClose,
  handleNo,
  handleYes,
  yesLabel = 'Yes',
  noLabel = 'No',
  hasNoAction = true,
}) => {
  return <>
    <MUIDialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <strong>{title}</strong>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {hasNoAction && 
          <Button onClick={() => {
            if (handleNo) {
              handleNo();
            }
  
            handleClose();
          }}>
            <strong>{noLabel}</strong>
          </Button>
        }

        <Button onClick={() => {
          if (handleYes) {
            handleYes();
          }

          handleClose();
        }} autoFocus>
          <strong>{yesLabel}</strong>
        </Button>
      </DialogActions>
    </MUIDialog>
  </>
};

export {
  ConfirmationDialog,
};