const url = `/api/v1`;

const signupAction = `${url}/users/signup`;
const signinAction = `${url}/users/signin`;
const googleSigninAction = `${url}/users/social`;
const getUserAction = `${url}/users?limit=1&offset=0`;
const getOneUserAction = `${url}/users/1`;
const updateUserAction = `${url}/users/1`;
const changePasswordAction = `${url}/users/change-password`;
const addCategoryAction = `${url}/categories`;
const getCategoryAction = `${url}/categories`;
const getBookAction = `${url}/books?limit=1&offset=0&category=1`;
const getOneBookAction = `${url}/books/1`;
const deleteBookAction = `${url}/books/1`;
const borrowBookAction = `${url}/users/1/books`;
const returnBookAction = `${url}/users/1/books`;
const viewUserBorrowAction = `${url}/users/1/books?owe=false&limit=1&offset=0`;
const viewUserReturnAction = `${url}/users/1/books?owe=true&limit=1&offset=0`;
const viewAllBorrowAction = `${url}/users/books/borrows?limit=1&offset=0`;
const viewAllReturnedAction = `${url}/users/books/returned?limit=1&offset=0`;
const confirmReturnAction = `${url}/borrows/1/confirm`;
const confirmBorrowAction = `${url}/borrows/1/confirm`;

export {
  signupAction,
  signinAction,
  googleSigninAction,
  getUserAction,
  getOneUserAction,
  updateUserAction,
  changePasswordAction,
  addCategoryAction,
  getCategoryAction,
  getBookAction,
  getOneBookAction,
  deleteBookAction,
  borrowBookAction,
  returnBookAction,
  viewUserBorrowAction,
  viewUserReturnAction,
  viewAllBorrowAction,
  viewAllReturnedAction,
  confirmReturnAction,
  confirmBorrowAction
};