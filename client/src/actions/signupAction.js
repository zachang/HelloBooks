import axios from 'axios';
import actionTypes from './actionTypes';

/**
 * @description sign-up user
 *
 * @param {object} userCredentials
 *
 * @return {object} Axios promise
 */
const signupAction = userCredentials => (dispatch) => {
  return axios.post('/api/v1/users/signup', userCredentials)
    .then((res) => {
      const token = res.data.token; // get the token
      window.sessionStorage.setItem('token', token);
      return dispatch({ type: actionTypes.SIGNUP_SUCCESSFUL });
    })
    .catch((err) => {
      if (err.response.data.message === 'Validation error') {
        return dispatch({
          type: actionTypes.SIGNUP_VALIDATION_ERROR,
          payload: err.response.data.errors });
      }
      return dispatch({
        type: actionTypes.SIGNUP_UNSUCCESSFUL,
        payload: err.response.data.message
      });
    });
};

export default signupAction;
