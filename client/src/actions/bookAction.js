import axios from 'axios';
import actionTypes from './actionTypes';
import { tokenValidate } from '../utils/helpers';
import uploader from '../utils/uploader';

const addBookAction = bookContents => (dispatch) => {
  uploader(bookContents.bookImage, 'image')
    .then((res) => {
      dispatch({
        type: 'UPLOAD_IMAGE_SUCCESSFUL',
        payLoad: res.response.body.url
      });
      bookContents.bookImage = res.response.body.url;
      uploader(bookContents.bookContent, 'pdf').then((res) => {
        dispatch({
          type: 'UPLOAD_PDF_SUCCESSFUL',
          payLoad: res.response.body.url
        });
        bookContents.bookContent = res.response.body.url;
        axios.post('/api/v1/books', bookContents,
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
      })
        .catch((err) => {
          if (err.uploadType && err.uploadType === 'image') {
            dispatch({
              type: 'UPLOAD_IMAGE_FAILED',
              payLoad: err.error.response.data
            });
          }

          if (err.uploadType && err.uploadType === 'pdf') {
            dispatch({
              type: 'UPLOAD_PDF_FAILED',
              payLoad: err.error.response.data
            });
          }
        });
    });
};

const updateBookAction = (bookContents, id) => (dispatch) => {
  if ((typeof bookContents.bookImage !== 'object' || bookContents.bookImage === null) &&
    (typeof bookContents.bookContent !== 'object' || bookContents.bookContent === null)) {
    axios.put(`/api/v1/books/${id}`, bookContents,
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
  } else {
    if (typeof bookContents.bookImage === 'object' && bookContents.bookImage !== null) {
      return uploader(bookContents.bookImage, 'image').then((res) => {
        dispatch({
          type: 'UPLOAD_IMAGE_SUCCESSFUL',
          payLoad: res.response.body.url
        });
        bookContents.bookImage = res.response.body.url;
        axios.put(`/api/v1/books/${id}`, bookContents,
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

    if (typeof bookContents.bookContent === 'object' && bookContents.bookContent !== null) {
      uploader(bookContents.bookContent, 'pdf').then((res) => {
        dispatch({
          type: 'UPLOAD_PDF_SUCCESSFUL',
          payLoad: res.response.body.url
        });
        bookContents.bookContent = res.response.body.url;
        axios.put(`/api/v1/books/${id}`, bookContents,
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
      })
        .catch((err) => {
          if (err.uploadType && err.uploadType === 'pdf') {
            dispatch({
              type: 'UPLOAD_PDF_FAILED',
              payLoad: err.error.response.data
            });
          }
        });
    }
  }
};

const getBookAction = (limit, offset, categoryId) => (dispatch) => {
  let url = `/api/v1/books?limit=${limit}&offset=${offset}`;
  if (categoryId !== '') {
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

const borrowBookAction = (userId, bookId) => (dispatch) => {
  axios.post(`/api/v1/users/${userId}/books`, { bookId },
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

const returnBookAction = (userId, bookId) => (dispatch) => {
  axios.put(`/api/v1/users/${userId}/books`, { bookId },
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.RETURNED_BOOK_SUCCESSFUL,
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
          type: actionTypes.RETURNED_BOOK_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const viewUserBorrowAction = (userId, limit, offset) => (dispatch) => {
  axios.get(`/api/v1/users/${userId}/books?owe=false&limit=${limit}&offset=${offset}`,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GET_USER_BORROW_SUCCESSFUL,
        payload: {
          borrows: res.data.borrowed,
          pageCount: res.data.paginationMeta.pageCount
        }
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

const viewUserReturnAction = (userId, limit, offset) => (dispatch) => {
  axios.get(`/api/v1/users/${userId}/books?owe=true&limit=${limit}&offset=${offset}`,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GET_USER_RETURNED_SUCCESSFUL,
        payload: {
          returnings: res.data.borrowed,
          pageCount: res.data.paginationMeta.pageCount
        }
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

const viewAllBorrowAction = (limit, offset) => (dispatch) => {
  axios.get(`/api/v1/users/books/borrows?limit=${limit}&offset=${offset}`,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GET_ALL_BORROW_SUCCESSFUL,
        payload: {
          borrowers: res.data.borrowers,
          pageCount: res.data.paginationMeta.pageCount
        }
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

const viewAllReturnedAction = (limit, offset) => (dispatch) => {
  axios.get(`/api/v1/users/books/returned?limit=${limit}&offset=${offset}`,
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.GET_ALL_RETURNED_SUCCESSFUL,
        payload: {
          returners: res.data.returners,
          pageCount: res.data.paginationMeta.pageCount
        }
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.GET_ALL_RETURNED_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};

const confirmReturnAction = borrowId => (dispatch) => {
  axios.put(`/api/v1/borrows/${borrowId}/confirm`, {},
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.CONFIRM_RETURNED_SUCCESSFUL,
        payload: { message: res.data.message, borrowId }
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.CONFIRM_RETURNED_UNSUCCESSFUL,
          payload: err.response.data.message
        });
      }
    });
};
const confirmBorrowAction = borrowId => (dispatch) => {
  axios.patch(`/api/v1/borrows/${borrowId}/confirm`, {},
    {
      headers: { 'x-access-token': window.sessionStorage.token }
    })
    .then((res) => {
      return dispatch({
        type: actionTypes.CONFIRM_BORROW_SUCCESSFUL,
        payload: { message: res.data.message, borrowId }
      });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        tokenValidate('invalid');
      } else if (err.response.status === 403) {
        tokenValidate('unauthorized');
      } else {
        return dispatch({
          type: actionTypes.CONFIRM_BORROW_UNSUCCESSFUL,
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
  viewAllBorrowAction,
  viewAllReturnedAction,
  confirmReturnAction,
  confirmBorrowAction
};
