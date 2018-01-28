import jwt_decode from 'jwt-decode';
import { browserHistory } from 'react-router';

/**
 * @description decodes token
 *
 *@function decodeToken
 *
 * @param {string} token
 *
 * @return {void} void
 */
const decodeToken = (token) => {
  return jwt_decode(token);
};

/**
 * @description redirects users to appropriate page
 *
 *@function redirectIfLoggedIn
 *
 * @param {string} token
 *
 * @return {void} void
 */
const redirectIfLoggedIn = (token) => {
  const decodedToken = jwt_decode(token);
  if (!decodedToken.isAdmin) {
    browserHistory.push('/user');
  } else {
    browserHistory.push('/admin');
  }
};

/**
 * @description validates token
 *
 *@function tokenValidate
 *
 * @param {string} type
 *
 * @return {void} void
 */
const tokenValidate = (type) => {
  if (type === 'invalid') {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  } else if (type === 'unauthorized') {
    browserHistory.push('/unauthorized');
  } else if (type === 'page not found') {
    browserHistory.push('*');
  }
};

export {
  decodeToken,
  tokenValidate,
  redirectIfLoggedIn
};
