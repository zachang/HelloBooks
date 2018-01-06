import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  googleSigned: null,
  fails: null
};
const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        fails: null
      };
      break;
    case actionTypes.SIGNIN_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload
      };
      break;
    case actionTypes.SOCIAL_SIGNIN_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        googleSigned: action.payload,
        fails: null
      };
      break;
    case actionTypes.SOCIAL_SIGNIN_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        googleSigned: null,
        fails: action.payload
      };
      break;
    case actionTypes.CLEAR_SOCIAL_STATE:
      state = {
        ...state,
        googleSigned: null,
      };
      break;
    default:
      return state;
  }
  return state;
};
export default signinReducer;