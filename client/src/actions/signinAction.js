import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import actionTypes from './actionTypes';

const signinAction = userCredentials => (dispatch) => {
  axios.post('/api/v1/users/signin', userCredentials)
    .then((res) => {
      const token = res.data.token; // get the token
      window.sessionStorage.setItem('token', token);
      const decodedToken = jwt_decode(token);
      if (!decodedToken.is_admin) {
        browserHistory.push('/user');
      } else {
        browserHistory.push('/admin');
      }
      return dispatch({ type: actionTypes.SIGNIN_SUCCESSFUL });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.SIGNIN_UNSUCCESSFUL, payload: 'Invalid Credentials' });
      // if (err.response.data.validateError) {
      //   dispatch({ type: actionTypes.SIGNIN_VALIDATION_ERROR,
      //     payload: err.response.data.validateError });
      // } else if (err.response.data === 'Incorrect password') {
      //   const error = { password: ['Incorrect password'] };
      //   dispatch({ type: actionTypes.SIGNIN_VALIDATION_ERROR, payload: error });
      // } else {
      //   dispatch({ type: actionTypes.SIGNIN_UNSUCCESSFUL, payload: 'Failed to login...Try again' });
      // }
    });
};

export default signinAction;
