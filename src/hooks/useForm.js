import { useState } from 'react';

const useForm = (fields) => {
  const initValues = Object.keys(fields).reduce((prev, key) => ({ ...prev, [key]: fields[key].value }), {});
  const [values, setValues] = useState(initValues);
  const [errors, setErros] = useState(initValues);

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });

    if (fields[name].validate && fields[name].validate.length) {
      fields[name].validate.forEach((item) => {
        setErros({ ...errors, [name]: { [item.type]: item.message } });
      });
    }
  };

  return [onChange, values, errors];
};

export default useForm;
