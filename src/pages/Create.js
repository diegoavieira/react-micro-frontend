import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import withToast from '../hocs/withToast';
import useForm from '../hooks/useForm';
import FormField from '../components/FormField';

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
  name: ['', ['required', 'minLength=5']],
  email: ['', ['required', { check: 'email', message: 'Email inválido' }]],
  newField: ['', ['required']]
};

const Create = () => {
  const classes = useStyles();
  const form = useForm(fields);

  const onSubmit = (values) => {
    console.log(values);
    form.reset();
  };

  return (
    <div className={classes.create}>
      <form noValidate autoComplete="off" onSubmit={form.onSubmit(onSubmit)}>
        <FormField
          required
          type="text"
          label="New Field"
          name="newField"
          onChange={form.onChange}
          onBlur={form.onBlur}
          value={form.values.newField}
          error={form.errors.newField.invalid}
          helperText={form.errors.newField.required}
        />

        <FormField
          required
          type="text"
          label="Name"
          name="name"
          onChange={form.onChange}
          onBlur={form.onBlur}
          value={form.values.name}
          error={form.errors.name.invalid}
          helperText={form.errors.name.required || form.errors.name.minLength}
        />

        <FormField
          required
          type="email"
          label="Email"
          name="email"
          onChange={form.onChange}
          onBlur={form.onBlur}
          value={form.values.email}
          error={form.errors.email.invalid}
          helperText={form.errors.email.required || form.errors.email.email}
        />

        <Button type="submit">Submit</Button>
        <Button onClick={form.reset}>Reset</Button>
        <Button onClick={() => form.fill({ name: 'uhuddd', newField: 123 })}>Fill</Button>
      </form>
    </div>
  );
};

export default withToast(Create);
