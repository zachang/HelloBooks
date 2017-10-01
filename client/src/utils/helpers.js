import jwt_decode from 'jwt-decode';
import { browserHistory } from 'react-router';

const decodeToken = (token) => {
  const decodedToken = jwt_decode(token);
  if (!decodedToken.is_admin) {
    browserHistory.push('/user');
  } else {
    browserHistory.push('/admin');
  }
};

const tokenValidate = (type) => {
  if (type === 1) {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  } else if (type === 2) {
    // unauthorize component
  }
};

export {
  decodeToken,
  tokenValidate
};
