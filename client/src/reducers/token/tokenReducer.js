import actionTypes from '../../actions/actionTypes';

const initialState = {
  message: null,
  type: null
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INVALID_TOKEN:
      state = {
        ...state,
        message: action.payload,
        type: 1
      };
      break;
    case actionTypes.UNAUTHORIZED_TOKEN:
      state = {
        ...state,
        message: action.payload,
        type: 2
      };
      break;
    default:
      return state;
  }
  return state;
};
export default tokenReducer;
