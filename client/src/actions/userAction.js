import axios from 'axios';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';
import uploader from '../utils/uploader';

/**
 * @description get all user
 *
 * @param {number} limit
 * @param {number} offset
 *
 * @return {object} Axios promise
 */
const getUserAction = (limit, offset) => (dispatch) => {
  return axios.get(`/api/v1/users?limit=${limit}&offset=${offset}`,
    { headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      dispatch({ type: actionTypes.GETUSERS_SUCCESSFUL,
        payload: {
          users: res.data.users,
          pageCount: res.data.paginationMeta.pageCount
        } });
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

/**
 * @description get one user
 *
 * @param {number} id
 *
 * @return {object} Axios promise
 */
const getOneUserAction = id => (dispatch) => {
  return axios.get(`/api/v1/users/${id}`,
    { headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      dispatch({
        type: actionTypes.GETONEUSER_SUCCESSFUL,
        payload: res.data.user
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else if (err.response.status === 404) {
        tokenValidate('page not found');
      } else {
        return dispatch({
          type: actionTypes.GETONEUSER_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

/**
 * @description update user
 *
 * @param {object} userData
 * @param {number} id
 *
 * @return {object} Axios promise
 */
const updateUserAction = (userData, id) => (dispatch) => {
  if ((typeof userData.userImage !== 'object' || userData.userImage === null)) {
    return axios.put(`/api/v1/users/${id}`, userData,
      { headers: { 'x-access-token': window.sessionStorage.token } })
      .then((res) => {
        return dispatch({
          type: actionTypes.UPDATEUSER_SUCCESSFUL,
          payload: res.data.message
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          tokenValidate('invalid');
        } else if (err.response.status === 403) {
          tokenValidate('unauthorized');
        } else if (err.response.data.message === 'Validation error') {
          return dispatch({
            type: actionTypes.UPDATEUSER_VALIDATION_ERROR,
            payload: err.response.data.errors
          });
        } else {
          return dispatch({
            type: actionTypes.UPDATEUSER_UNSUCCESSFUL,
            payload: err.response.data.message
          });
        }
      });
  } else if (typeof userData.userImage === 'object'
    && userData.userImage !== null) {
    return uploader(userData.userImage, 'image').then((res) => {
      dispatch({
        type: 'UPLOAD_IMAGE_SUCCESSFUL',
        payLoad: res.response.body.url
      });
      userData.userImage = res.response.body.url;
      axios.put(`/api/v1/users/${id}`, userData,
        { headers: { 'x-access-token': window.sessionStorage.token } })
        .then((res) => {
          return dispatch({
            type: actionTypes.UPDATEUSER_SUCCESSFUL,
            payload: res.data.message
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            tokenValidate('invalid');
          } else if (err.response.status === 403) {
            tokenValidate('unauthorized');
          } else if (err.response.data.message === 'Validation error') {
            return dispatch({
              type: actionTypes.UPDATEUSER_VALIDATION_ERROR,
              payload: err.response.data.errors
            });
          } else {
            return dispatch({
              type: actionTypes.UPDATEUSER_UNSUCCESSFUL,
              payload: err.response.data.message
            });
          }
        });
    })
      .catch((err) => {
        if (err.uploadType && err.uploadType === 'image') {
          dispatch({
            type: 'UPLOAD_IMAGE_FAILED',
            payLoad: err.error.response.data
          });
        }
      });
  }
};

/**
 * @description change password
 *
 * @param {object} changePasswordData
 *
 * @return {object} Axios promise
 */
const changePasswordAction = changePasswordData => (dispatch) => {
  return axios.post(`/api/v1/users/change-password`, changePasswordData,
    { headers: { 'x-access-token': window.sessionStorage.token } })
    .then((res) => {
      return dispatch({
        type: actionTypes.CHANGE_PASSWORD_SUCCESSFUL,
        payload: res.data.message
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else if (err.response.data.message === 'Validation error') {
        return dispatch({
          type: actionTypes.CHANGE_PASSWORD_VALIDATION_ERROR,
          payload: err.response.data.errors
        });
      } else {
        return dispatch({
          type: actionTypes.CHANGE_PASSWORD_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

export {
  getUserAction,
  getOneUserAction,
  updateUserAction,
  changePasswordAction
};
