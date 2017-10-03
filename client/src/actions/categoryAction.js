import axios from 'axios';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';

const addCategoryAction = categoryContents => (dispatch) => {
  axios.post('/api/v1/categories', categoryContents,
    { headers: { 'x-access-token': window.sessionStorage.token } })
    .then((res) => {
      return dispatch({ type: actionTypes.ADDCATEGORY_SUCCESSFUL,
        payload: res.data.message });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        return dispatch({ type: actionTypes.INVALID_TOKEN,
          payload: err.response.data.message });
      }
      if (err.response.status === 403) {
        return dispatch({ type: actionTypes.UNAUTHORIZED_TOKEN,
          payload: err.response.data.message });
      }
      if (err.response.data.message === 'Validation error') {
        return dispatch({ type: actionTypes.ADDCATEGORY_VALIDATION_ERROR,
          payload: err.response.data.errors });
      }
      return dispatch({ type: actionTypes.ADDCATEGORY_UNSUCCESSFUL,
        payload: err.response.data.message });
    });
};

const getCategoryAction = () => (dispatch) => {
  axios.get('/api/v1/categories',
    { headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({ type: actionTypes.GETCATEGORY_SUCCESSFUL,
        payload: res.data.category });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        return dispatch({ type: actionTypes.INVALID_TOKEN,
          payload: err.response.data.message });
      }
      if (err.response.status === 403) {
        return dispatch({ type: actionTypes.UNAUTHORIZED_TOKEN,
          payload: err.response.data.message });
      }
      return dispatch({ type: actionTypes.GETCATEGORY_UNSUCCESSFUL,
        payload: err.response.data.message });
    });
};

export { addCategoryAction, getCategoryAction };
