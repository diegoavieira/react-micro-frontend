import React, { useState } from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const withToast = (WrappedComponent) => (props) => {
  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

  const show = {
    success: (message) => setToast({ open: true, message, type: 'success' }),
    info: (message) => setToast({ open: true, message, type: 'info' }),
    warning: (message) => setToast({ open: true, message, type: 'warning' }),
    error: (message) => setToast({ open: true, message, type: 'error' })
  };

  const close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast({ ...toast, open: false });
  };

  return (
    <>
      <WrappedComponent {...props} toast={show} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        autoHideDuration={4000}
        open={toast.open}
        onClose={close}
        TransitionComponent={Slide}
      >
        <Alert onClose={close} severity={toast.type}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default withToast;
