import jwt_decode from 'jwt-decode';
import { browserHistory } from 'react-router';

const decodeToken = (token) => {
  const decodedToken = jwt_decode(token);
  if (!decodedToken.is_admin) {
    browserHistory.push('/user');
  } else {
    browserHistory.push('/admin');
  }
}

export default decodeToken;
