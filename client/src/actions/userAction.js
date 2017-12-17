import axios from 'axios';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';

const getUserAction = (limit, offset) => (dispatch) => {
  axios.get(`/api/v1/users?limit=${limit}&offset=${offset}`,
    { headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({ type: actionTypes.GETUSERS_SUCCESSFUL,
        payload: {
          users: res.data.users,
          pageCount: res.data.paginationMeta.pageCount
      }});
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GETUSERS_UNSUCCESSFUL,
          payload: err.response.data.message,
        });
      }
    });
};

export default getUserAction;
