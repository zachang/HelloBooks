import axios from 'axios';
import superagent from 'superagent';
import sha1 from 'sha1';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';

const addBookAction = bookContents => (dispatch) => {
  // const form = document.querySelector('form');
  // const data = new FormData(form);
  dispatch({ type: 'UPLOAD_IMAGE'});
  const cloudName = 'hellobookz';
  const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload';
  const timestamp = Date.now()/1000;
  const uploadPreset = 'iatwiohn';
  const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'V9wVd_HdjhVrnZYCYyGo3mNszNE';
  const signature = sha1(paramsStr);
  const params = {
    'api_key': '471689873521792',
    'timestamp': timestamp,
    'upload_preset': uploadPreset,
    'signature': signature
  };
  let uploadRequest = superagent.post(url);
  uploadRequest.attach('file', bookContents.book_image);
  Object.keys(params).forEach((key) => {
    uploadRequest.field(key, params[key])
  });
  uploadRequest.end((err, resp) => {
    if(err){
      dispatch({type: 'UPLOAD_IMAGE_UNSUCCESSFUL'});
      console.log(err);
      return
    }
    bookContents.book_image = resp.body.url;
    console.log(bookContents, 'from cloudinary');

    axios.post('/api/v1/books', bookContents ,
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