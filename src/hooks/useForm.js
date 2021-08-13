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

  const fieldErrors = (name, value) => {
    const validates = fields[name][1];

    if (validates && validates.length) {
      return validates
        .map((validate) => {
          const checkValid = validation(validate, value);

          if (!checkValid.valid) {
            return { invalid: true, [checkValid.check]: checkValid.message };
          }

          return { invalid: false };
        })
        .reduce((prev, curr) => ({ ...prev, [name]: { ...prev[name], ...curr } }), {});
    }

    return initErrors;
  };

  useEffect(() => {
    const hasErrors = fieldsKeys.filter((key) => fieldErrors(key, values[key])[key].invalid);
    setInvalid(!!hasErrors.length);
  }, [values]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: initErrors[name] });
  };

  const onBlur = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, ...fieldErrors(name, value) });
  };

  const onSubmit = (submit) => (event) => {
    event.preventDefault();

    if (invalid) {
      const newErrors = {};

      fieldsKeys.forEach((key) => {
        newErrors[key] = fieldErrors(key, values[key])[key];
      });

      setErrors(newErrors);
    } else {
      submit(values);
    }
  };

  const reset = () => {
    setValues(initValues);
    setErrors(initErrors);
  };

  return { values, setValues, errors, invalid, onChange, onBlur, onSubmit, reset };
};

export default useForm;
