import axios from 'axios';
import actionTypes from './actionTypes';
import { redirectIfLoggedIn } from '../utils/helpers';

const signinAction = userCredentials => (dispatch) => {
  axios.post('/api/v1/users/signin', userCredentials)
    .then((res) => {
      const token = res.data.token; // get the token
      window.sessionStorage.setItem('token', token);
      redirectIfLoggedIn(token);
      return dispatch({ type: actionTypes.SIGNIN_SUCCESSFUL });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.SIGNIN_UNSUCCESSFUL, payload: 'Invalid Credentials' });
    });
};

export default signinAction;
