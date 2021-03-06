import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  passes: null,
  errors: null,
  fails: null,
  books: [],
  book: null,
  borrows: null,
  allBorrows: null,
  borrowers: [],
  returned: null,
  returnings: null,
  returners: [],
  pageCount: null,
  confirmReturn: null,
  clickedReturnedBorrowList: [],
  confirmBorrow: null,
  clickedBorrowList: []
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDBOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        passes: action.payload,
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
        passes: null,
        errors: action.payload
      };
      break;
    case actionTypes.UPDATEBOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null
      };
      break;
    case actionTypes.UPDATEBOOK_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    case actionTypes.UPDATEBOOK_UNSUCCESSFUL:
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
        books: action.books,
        pageCount: action.pageCount
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
    case actionTypes.GETONEBOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        book: action.payload
      };
      break;
    case actionTypes.GETONEBOOK_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        book: null
      };
      break;
    case actionTypes.DELETE_BOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        fails: null,
        books: state.books.filter(book =>
          book.id !== action.payload
        )
      };
      break;
    case actionTypes.DELETE_BOOK_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload,
      };
      break;
    case actionTypes.BORROW_BOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        fails: null,
        borrows: action.payload
      };
      break;
    case actionTypes.BORROW_BOOK_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload,
      };
      break;
    case actionTypes.RETURNED_BOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        returned: action.payload,
        errors: null,
        fails: null,
      };
      break;
    case actionTypes.RETURNED_BOOK_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload,
      };
      break;
    case actionTypes.GET_USER_BORROW_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        allBorrows: action.payload.borrows,
        pageCount: action.payload.pageCount
      };
      break;
    case actionTypes.GET_USER_BORROW_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        allBorrows: null
      };
      break;
    case actionTypes.GET_ALL_BORROW_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        borrowers: action.payload.borrowers,
        pageCount: action.payload.pageCount
      };
      break;
    case actionTypes.GET_ALL_BORROW_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        borrowers: null
      };
      break;
    case actionTypes.GET_USER_RETURNED_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        returnings: action.payload.returnings,
        pageCount: action.payload.pageCount
      };
      break;
    case actionTypes.GET_USER_RETURNED_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        returnings: null
      };
      break;
    case actionTypes.GET_ALL_RETURNED_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        returners: action.payload.returners,
        pageCount: action.payload.pageCount
      };
      break;
    case actionTypes.GET_ALL_RETURNED_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        returners: null
      };
      break;
    case actionTypes.CONFIRM_RETURNED_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        confirmReturn: action.payload.message,
        clickedReturnedBorrowList: [...state.clickedReturnedBorrowList,
          action.payload.borrowId]
      };
      break;
    case actionTypes.CONFIRM_RETURNED_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    case actionTypes.CONFIRM_BORROW_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        confirmBorrow: action.payload.message,
        clickedBorrowList: [...state.clickedBorrowList,
          action.payload.borrowId]
      };
      break;
    case actionTypes.CONFIRM_BORROW_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

export default bookReducer;
