import { useEffect, useState } from 'react';

const validation = (validate, value) => {
  const rule = validate && typeof validate === 'string' ? { check: validate } : validate;

  [rule.check, rule.value = null] = rule.check.split('=');

  switch (rule.check) {
    case 'required':
      return { check: rule.check, valid: !!value, message: rule.message || 'Required!' };
    case 'minLength':
      return {
        check: rule.check,
        valid: !!(value && +rule.value <= value.length),
        message: rule.message || `Min length is ${rule.value}.`
      };
    case 'email':
      return {
        check: rule.check,
        valid: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value),
        message: rule.message || 'Invalid format.'
      };
    default:
      return { valid: true };
  }
};

const useForm = (fields) => {
  const fieldsKeys = Object.keys(fields);
  const initValues = fieldsKeys.reduce((prev, key) => ({ ...prev, [key]: fields[key][0] }), {});
  const initErrors = fieldsKeys.reduce((prev, key) => ({ ...prev, [key]: { invalid: false } }), {});

  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState(initErrors);
  const [invalid, setInvalid] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const fieldErrors = (name, value) => {
    const validates = fields[name][1];

    if (validates && validates.length) {
      validates.forEach((validate) => {
        const checkValid = validation(validate, value);

        if (!checkValid.valid) {
          errors[name] = { ...errors[name], invalid: true, [checkValid.check]: checkValid.message };
        }
      });
    }

    return errors;
  };

  useEffect(() => {
    Object.keys(values).forEach((key) => {
      const validates = fields[key][1];

      setInvalid(!!(validates && validates.length));

      if (values[key]) {
        setErrors({ ...fieldErrors(key, values[key]) });
      }
    });
  }, []);

  useEffect(() => {
    setSubmitted(false);
  }, [submitted]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: initErrors[name] });
    console.log(errors);
  };

  const onBlur = (event) => {
    const { name, value } = event.target;
    console.log(fieldErrors(name, value));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // Object.keys(values).forEach((key) => setFieldErrors(key, values[key]));
    setSubmitted(true);
  };

  const onReset = () => {
    setValues(initValues);
    setErrors(initErrors);
    setSubmitted(false);
  };

  useEffect(() => {
    // Object.keys(values).forEach((key) => {
    //   console.log(key);
    //   const validates = fields[key][1];
    //   setInvalid(!!(validates && validates.length));
    //   // if (values[key]) {
    //   //   setFieldErrors(key, values[key]);
    //   // }
    // });
    // const hasError = Object.keys(errors).filter((key) => errors[key].invalid);
    // setInvalid(!!hasError.length);
  }, [invalid]);

  return { values, errors, invalid, submitted, onChange, onBlur, onSubmit, onReset };
};

export default useForm;
