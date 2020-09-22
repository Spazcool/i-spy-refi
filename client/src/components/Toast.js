import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast(props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const showBar = () => {
    const { openIt, message} = props;
    if (openIt) {
      setMessage(message === undefined ? 'Action performed.' : message);
      checkSeverity(message);
      setOpen(true);
    }
  };

  const checkSeverity = (msg) => {
    if (msg !== undefined) {
      msg.includes('successfully') ?
      setSeverity('success')
      :
      setSeverity('error')
    }else{
      setSeverity('error')
    }
  }


  useEffect(() => {
    showBar()
  },[props])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>{message}</Alert>
    </Snackbar>
  );
}