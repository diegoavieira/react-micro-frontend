import { useState } from 'react';

const validation = (validate, value) => {
  switch (validate.type) {
    case 'required':
      return { valid: !!value, message: validate.message || 'Required!' };
    case 'minLength':
      return {
        valid: !!(value && validate.value <= value.length),
        message: validate.message || `Min length is ${validate.value}.`
      };
    default:
      return { valid: true };
  }
};

const useForm = (fields) => {
  const initValues = Object.keys(fields).reduce((prev, key) => ({ ...prev, [key]: fields[key].value }), {});
  const [values, setValues] = useState(initValues);
  const [errors, setErros] = useState(initValues);

  const setFieldErrors = (name, value) => {
    if (fields[name].validates && fields[name].validates.length) {
      const fieldErrors = { [name]: { invalid: false, message: [] } };

      fields[name].validates.forEach((validate) => {
        const checkValid = validation(validate, value);

        if (!checkValid.valid) {
          fieldErrors[name].invalid = true;
          fieldErrors[name].message = [...fieldErrors[name].message, checkValid.message];
        }
      });

      [fieldErrors[name].message] = fieldErrors[name].message;

      setErros({ ...errors, ...fieldErrors });
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    setFieldErrors(name, value);
  };

  const onBlur = (event) => {
    const { name, value } = event.target;

    setFieldErrors(name, value);
  };

  return [onChange, onBlur, values, errors];
};

export default useForm;
