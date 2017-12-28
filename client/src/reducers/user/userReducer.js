import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  errors: null,
  fails: null,
  users: [],
  user: [],
  pageCount: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETUSERS_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        users: action.payload.users,
        pageCount: action.payload.pageCount
      };
      break;
    case actionTypes.GETUSERS_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        users: null
      };
      break;
    case actionTypes.GETONEUSER_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        user: action.payload
      };
      break;
    case actionTypes.GETONEUSER_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        user: null
      };
      break;
    case actionTypes.UPDATEUSER_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null
      };
      break;
    case actionTypes.UPDATEUSER_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    case actionTypes.UPDATEUSER_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload
      };
      break;
    case actionTypes.CHANGE_PASSWORD_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null
      };
      break;
    case actionTypes.CHANGE_PASSWORD_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    case actionTypes.CHANGE_PASSWORD_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

export default userReducer;
