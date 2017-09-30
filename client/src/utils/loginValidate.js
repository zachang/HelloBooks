import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const loginValidate = (data) => {
  const errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default loginValidate;
