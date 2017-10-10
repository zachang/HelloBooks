import axios from 'axios';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';

const addBookAction = bookContents => (dispatch) => {
  const form = document.querySelector('form');
  const data = new FormData(form);
  axios.post('/api/v1/books', data,
    { headers: { 'x-access-token': window.sessionStorage.token } })
    .then((res) => {
      return dispatch({
        type: actionTypes.ADDBOOK_SUCCESSFUL,
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
          type: actionTypes.ADDBOOK_VALIDATION_ERROR,
          payload: err.response.data.errors
        });
      } else {
        return dispatch({
          type: actionTypes.ADDBOOK_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const updateBookAction = (bookContents, id) => (dispatch) => {
  const form = document.querySelector('form');
  const data = new FormData(form);
  axios.put(`/api/v1/books/${id}`, data,
    { headers: { 'x-access-token': window.sessionStorage.token } })
    .then((res) => {
      return dispatch({
        type: actionTypes.UPDATEBOOK_SUCCESSFUL,
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
          type: actionTypes.UPDATEBOOK_VALIDATION_ERROR,
          payload: err.response.data.errors
        });
      } else {
        return dispatch({
          type: actionTypes.UPDATEBOOK_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const getBookAction = () => (dispatch) => {
  axios.get('/api/v1/books',
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GETBOOKS_SUCCESSFUL,
        payload: res.data.books
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GETBOOKS_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
}

const getOneBookAction = id => (dispatch) => {
  axios.get(`/api/v1/books/${id}`,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GETONEBOOK_SUCCESSFUL,
        payload: res.data.book
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GETONEBOOK_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
}

export { addBookAction, updateBookAction, getBookAction, getOneBookAction };