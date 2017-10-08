import axios from 'axios';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';

const getUserAction = () => (dispatch) => {
  axios.get('/api/v1/users',
    { headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({ type: actionTypes.GETUSERS_SUCCESSFUL,
        payload: res.data.user });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GETUSERS_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

export default getUserAction;
