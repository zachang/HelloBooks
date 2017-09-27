import axios from 'axios';
import actionTypes from './actionTypes';
import decodeToken from '../utils/tokenDecode';

const signinAction = userCredentials => (dispatch) => {
  axios.post('/api/v1/users/signin', userCredentials)
    .then((res) => {
      const token = res.data.token; // get the token
      window.sessionStorage.setItem('token', token);
      decodeToken(token);
      return dispatch({ type: actionTypes.SIGNIN_SUCCESSFUL });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.SIGNIN_UNSUCCESSFUL, payload: 'Invalid Credentials' });
    });
};

export default signinAction;
