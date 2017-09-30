import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  errors: null,
  fails: null,
};
const addBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDBOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        fails: null
      };
      break;
    case actionTypes.ADDBOOK_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    case actionTypes.ADDBOOK_UNSUCCESSFUL:
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
export default addBookReducer;