import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import withToast from '../hocs/withToast';
import useForm from '../hooks/useForm';

const useStyles = makeStyles(() => ({
  create: {
    padding: '24px'
  }
}));

const fields = {
  name: {
    value: 'asd',
    validates: [
      { type: 'required', message: 'Field is required.' },
      { type: 'minLength', value: 5 }
    ]
  }
};

const Create = () => {
  const classes = useStyles();
  const [onChange, onBlur, values, errors] = useForm(fields);

  return (
    <div className={classes.create}>
      <form noValidate autoComplete="off">
        <TextField
          variant="filled"
          fullWidth
          type="text"
          label="Name"
          name="name"
          onChange={onChange}
          onBlur={onBlur}
          value={values.name}
          required
          error={errors.name.invalid}
          helperText={errors.name.message}
        />
      </form>
    </div>
  );
};

export default withToast(Create);
