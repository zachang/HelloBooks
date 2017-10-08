import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  errors: null,
  fails: null,
  books: []
};

const bookReducer = (state = initialState, action) => {
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
    case actionTypes.GETBOOKS_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        books: action.payload
      };
      break;
    case actionTypes.GETBOOKS_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        books: null
      };
      break;
    default:
      return state;
  }
  return state;
};


export default bookReducer;