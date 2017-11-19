import axios from 'axios';
import superagent from 'superagent';
import sha1 from 'sha1';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';

const addBookAction = bookContents => (dispatch) => {

  dispatch({ type: 'UPDATE_IMAGE'});
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
      dispatch({type: 'UPDATE_IMAGE_UNSUCCESSFUL'});
      console.log(err);
      return
    }
    bookContents.book_image = resp.body.url;

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

  if (typeof bookContents.book_image !== 'object' || bookContents.book_image === null){
    axios.put(`/api/v1/books/${id}`, bookContents,
      {headers: {'x-access-token': window.sessionStorage.token}})
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
  } else {
    uploadRequest.end((err, resp) => {
      if (err) {
        dispatch({type: 'UPLOAD_IMAGE_UNSUCCESSFUL'});
        console.log(err);
        return
      }
      bookContents.book_image = resp.body.url;
      axios.put(`/api/v1/books/${id}`, bookContents,
        {headers: {'x-access-token': window.sessionStorage.token}})
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
    });
  }
};

const getBookAction = (limit, offset, categoryId) => (dispatch) => {

  let url = `/api/v1/books?limit=${limit}&offset=${offset}`;
  if (categoryId !== ''){
    url = `${url}&category=${categoryId}`;
  }
  axios.get(
    url,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GETBOOKS_SUCCESSFUL,
        books: res.data.books,
        pageCount: res.data.paginationMeta.pageCount
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
};

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
};


const deleteBookAction = id => (dispatch) => {
  axios.delete(`/api/v1/books/${id}`,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.DELETE_BOOK_SUCCESSFUL,
        payload: id
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.DELETE_BOOK_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const borrowBookAction = (userId, bookId)=> (dispatch) => {
  axios.post(`/api/v1/users/${userId}/books`, { 'book_id': bookId },
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.BORROW_BOOK_SUCCESSFUL,
        payload: res.data.message
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.BORROW_BOOK_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const returnBookAction = (userId, bookId)=> (dispatch) => {
  axios.put(`/api/v1/users/${userId}/books`, { 'book_id': bookId },
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      console.log(actionTypes.RETURN_BOOK_SUCCESSFUL, 'hello');
      return dispatch({
        type: actionTypes.RETURN_BOOK_SUCCESSFUL,
        payload: res.data.message
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.RETURN_BOOK_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const viewUserBorrowAction = (userId) => (dispatch) => {
  axios.get(`/api/v1/users/${userId}/books?owe=false`,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GET_USER_BORROW_SUCCESSFUL,
        payload: res.data.borrowed
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GET_USER_BORROW_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const viewUserReturnAction = (userId) => (dispatch) => {
  axios.get(`/api/v1/users/${userId}/books?owe=true`,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GET_USER_RETURNED_SUCCESSFUL,
        payload: res.data.borrowed
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GET_USER_RETURNED_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const viewAllBorrowAction = () => (dispatch) => {
  axios.get('/api/v1/users/books/borrows',
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GET_ALL_BORROW_SUCCESSFUL,
        payload: res.data.borrowers,
        tests: console.log('>>>>>>>>', res.data.borrowers)
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GET_ALL_BORROW_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

export {
  addBookAction,
  updateBookAction,
  getBookAction,
  getOneBookAction,
  deleteBookAction,
  borrowBookAction,
  viewUserBorrowAction,
  returnBookAction,
  viewUserReturnAction,
  viewAllBorrowAction
};
