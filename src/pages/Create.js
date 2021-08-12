import React, { useEffect } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import withToast from '../hocs/withToast';
import useForm from '../hooks/useForm';

const useStyles = makeStyles(() => ({
  create: {
    padding: '24px'
  },
  fieldHeight: {
    height: '78px',
    marginBottom: '4px'
  }
}));

const fields = {
  name: ['asd', ['required', 'minLength=5']],
  email: ['', ['required', { check: 'email', message: 'Email invalid' }]]
};

const Create = () => {
  const classes = useStyles();
  const form = useForm(fields);

  useEffect(() => {
    if (form.submitted) {
      console.log('valuess', form.values);
      // form.onReset();
    }
  }, [form]);

  return (
    <div className={classes.create}>
      <form noValidate autoComplete="off" onSubmit={form.onSubmit}>
        <TextField
          className={classes.fieldHeight}
          variant="filled"
          fullWidth
          type="text"
          label="Name"
          name="name"
          onChange={form.onChange}
          onBlur={form.onBlur}
          value={form.values.name}
          required
          error={form.errors.name.invalid}
          helperText={form.errors.name.required || form.errors.name.minLength}
        />
        <TextField
          className={classes.fieldHeight}
          variant="filled"
          fullWidth
          type="email"
          label="Email"
          name="email"
          onChange={form.onChange}
          onBlur={form.onBlur}
          value={form.values.email}
          required
          error={form.errors.email.invalid}
          helperText={form.errors.email.required || form.errors.email.email}
        />
        <Button disabled={form.invalid} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default withToast(Create);
