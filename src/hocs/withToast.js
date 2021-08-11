import React, { useEffect, useState } from 'react';
import { makeStyles, Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {
    width: '360px'
  }
}));

const withToast = (WrappedComponent) => (props) => {
  const classes = useStyles();
  const [toasts, setToasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toasts.length && !toast) {
      setToast({ ...toasts[0] });
      setToasts((prev) => prev.slice(1));
      setOpen(true);
    } else if (toasts.length && toast && open) {
      setOpen(false);
    }
  }, [toasts, toast, open]);

  const createToasts = (message, severity) => {
    setToasts((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
  };

  const show = {
    success: (message) => createToasts(message, 'success'),
    info: (message) => createToasts(message, 'info'),
    warning: (message) => createToasts(message, 'warning'),
    error: (message) => createToasts(message, 'error')
  };

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onExited = () => {
    setToast(null);
  };

  return (
    <>
      <WrappedComponent {...props} toast={show} />
      <Snackbar
        key={toast ? toast.key : null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        autoHideDuration={3000}
        open={open}
        onClose={onClose}
        TransitionComponent={Slide}
        TransitionProps={{ onExited }}
      >
        <Alert className={classes.root} onClose={onClose} severity={toast ? toast.severity : null}>
          {toast ? toast.message : null}
        </Alert>
      </Snackbar>
    </>
  );
};

export default withToast;
