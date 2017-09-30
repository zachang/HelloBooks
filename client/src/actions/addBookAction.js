import axios from 'axios';
import actionTypes from './actionTypes';

const addBookAction = bookContents => (dispatch) => {
  axios.post('/api/v1/books', bookContents,
    { headers: { 'x-access-token': window.sessionStorage.token } })
    .then((res) => {
      return dispatch({ type: actionTypes.ADDBOOK_SUCCESSFUL,
        payload: res.data.message });
    })
    .catch((err) => {
      if (err.response.data.message === 'Validation error') {
        return dispatch({ type: actionTypes.ADDBOOK_VALIDATION_ERROR,
          payload: err.response.data.errors });
      }
      return dispatch({ type: actionTypes.ADDBOOK_UNSUCCESSFUL,
        payload: err.response.data.message });
    });
};

export default addBookAction;