import { FilledInput, FormControl, FormHelperText, InputLabel, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    height: '78px',
    marginBottom: '4px'
  },
  filledInput: {
    borderRadius: 0,
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.grey[200]
    }
  }
}));

const FormField = ({ required, type, label, name, value, onChange, onBlur, error, helperText }) => {
  const classes = useStyles();

  return (
    <FormControl required={required} variant="filled" fullWidth className={classes.formControl}>
      <InputLabel error={error}>{label}</InputLabel>
      <FilledInput
        className={classes.filledInput}
        disableUnderline
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default FormField;
