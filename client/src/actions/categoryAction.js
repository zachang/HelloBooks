import axios from 'axios';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';

/**
 * @description add categories
 *
 * @param {object} categoryContents
 *
 * @return {object} Axios promise
 */
const addCategoryAction = categoryContents => (dispatch) => {
  return axios.post('/api/v1/categories', categoryContents,
    { headers: { 'x-access-token': window.sessionStorage.token } })
    .then((res) => {
      return dispatch({ type: actionTypes.ADDCATEGORY_SUCCESSFUL,
        payload: res.data.message });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else if (err.response.data.message === 'Validation error') {
        return dispatch({
          type: actionTypes.ADDCATEGORY_VALIDATION_ERROR,
          payload: err.response.data.errors
        });
      } else {
        return dispatch({
          type: actionTypes.ADDCATEGORY_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

/**
 * @description get a category
 *
 * @param {void} void
 *
 * @return {object} Axios promise
 */
const getCategoryAction = () => (dispatch) => {
  return axios.get('/api/v1/categories',
    { headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({ type: actionTypes.GETCATEGORY_SUCCESSFUL,
        payload: res.data.category });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GETCATEGORY_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

export { addCategoryAction, getCategoryAction };
