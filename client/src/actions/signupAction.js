import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from './actionTypes';

const signupAction = userCredentials => (dispatch) => {
  axios.post('/api/v1/users/signup', userCredentials)
    .then((res) => {
      console.log(res, 'then');
      const token = res.data.token; // get the token
      window.sessionStorage.setItem('token', token);
      browserHistory.push('/user');
      return dispatch({ type: actionTypes.SIGNUP_SUCCESSFUL });
    })
    .catch((err) => {
      console.log(err.res, 'catch');
      if (err.response.data.message === 'Validation error') {
        return dispatch({ type: actionTypes.SIGNUP_VALIDATION_ERROR,
          payload: err.response.data.errors });
      }
      return dispatch({ type: actionTypes.SIGNUP_UNSUCCESSFUL,
        payload: 'Registration fail' });
    });
};

export default signupAction;
