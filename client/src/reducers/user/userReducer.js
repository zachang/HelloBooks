import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  errors: null,
  fails: null,
  users: []
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETUSERS_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        users: action.payload
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
    default:
      return state;
  }
  return state;
};

export default userReducer;
