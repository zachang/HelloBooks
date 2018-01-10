import * as mockData from '../../mockData';
import actionTypes from '../../../src/actions/actionTypes';
import bookReducer from '../../../src/reducers/book/bookReducer';

const {
  bookInitialState,
  addBookInitialState,
  updateBookInitialState,
  getAllBooks,
  getAllBookInitialState,
  getABook,
  getABookInitialState,
  deleteBookInitialState,
  borrowBookInitialState,
  returnBookInitialState,
  getAUserBorrows,
  getAllBorrows,
  getAllReturned,
  allBorrowsInitialState,
  allReturnedInitialState,
  borrowByUserInitialState,
  returnByUserInitialState,
  confirmBorrowInitialState,
  confirmReturnInitialState
} = mockData;

describe('Add book', () => {
  it('should add a book', () => {
    expect(bookReducer(addBookInitialState, {
      type: actionTypes.ADDBOOK_SUCCESSFUL,
      payload: 'Book Created'
    })).toEqual({
      success: true,
      errors: null,
      passes: 'Book Created',
    });
  });
  it('should not add book', () => {
    expect(bookReducer(addBookInitialState, {
      type: actionTypes.ADDBOOK_UNSUCCESSFUL,
      payload: 'Book not created'
    })).toEqual({
      success: false,
      errors: 'Book not created',
      passes: null,
    });
  });
  it('should not add book if validation error', () => {
    expect(bookReducer(addBookInitialState, {
      type: actionTypes.ADDBOOK_VALIDATION_ERROR,
      payload: 'Validation error'
    })).toEqual({
      success: false,
      errors: 'Validation error',
      passes: null,
    });
  });
});

describe('Update book', () => {
  it('should update a book', () => {
    expect(bookReducer(updateBookInitialState, {
      type: actionTypes.UPDATEBOOK_SUCCESSFUL,
    })).toEqual({
      success: true,
      errors: null,
      fails: null
    });
  });
  it('should not update book', () => {
    expect(bookReducer(updateBookInitialState, {
      type: actionTypes.UPDATEBOOK_UNSUCCESSFUL,
      payload: 'Book not updated'
    })).toEqual({
      success: false,
      errors: null,
      fails: 'Book not updated',
    });
  });
  it('should not add book if validation error', () => {
    expect(bookReducer(updateBookInitialState, {
      type: actionTypes.UPDATEBOOK_VALIDATION_ERROR,
      payload: 'Validation error'
    })).toEqual({
      success: false,
      errors: 'Validation error',
      fails: null,
    });
  });
});

describe('Get all books', () => {
  it('should return an array of all books', () => {
    expect(bookReducer(getAllBookInitialState, {
      type: actionTypes.GETBOOKS_SUCCESSFUL,
      books: getAllBooks,
      pageCount: 1
    })).toEqual({
      success: true,
      errors: null,
      books: getAllBooks,
      pageCount: 1
    });
  });
  it('should not return any books', () => {
    expect(bookReducer(getAllBookInitialState, {
      type: actionTypes.GETBOOKS_UNSUCCESSFUL,
      payload: 'Error... no books returned',
      pageCount: 1
    })).toEqual({
      success: false,
      errors: 'Error... no books returned',
      books: null,
      pageCount: null
    });
  });
});

describe('Get a book', () => {
  it('should a book', () => {
    expect(bookReducer(getABookInitialState, {
      type: actionTypes.GETONEBOOK_SUCCESSFUL,
      payload: getABook,
    })).toEqual({
      success: true,
      errors: null,
      book: getABook
    });
  });
  it('should not return a book', () => {
    expect(bookReducer(getABookInitialState, {
      type: actionTypes.GETONEBOOK_UNSUCCESSFUL,
      payload: 'Error... no book returned',
    })).toEqual({
      success: false,
      errors: 'Error... no book returned',
      book: null,
    });
  });
});

describe('Delete book', () => {
  it('should a book', () => {
    expect(bookReducer(getAllBooks, {
      type: actionTypes.DELETE_BOOK_SUCCESSFUL,
      payload: 1,
    })).toEqual({
      success: true,
      errors: null,
      fails: null,
      books: getAllBooks.books.filter(book =>
        book.id !== 1)
    });
  });
  it('should not delete book', () => {
    expect(bookReducer(deleteBookInitialState, {
      type: actionTypes.DELETE_BOOK_UNSUCCESSFUL,
      payload: 'Book not deleted',
    })).toEqual({
      success: false,
      errors: null,
      fails: 'Book not deleted',
      books: []
    });
  });
});

describe('Borrow book', () => {
  it('should borrow a book', () => {
    expect(bookReducer(borrowBookInitialState, {
      type: actionTypes.BORROW_BOOK_SUCCESSFUL,
      payload: 'Borrow successful',
    })).toEqual({
      success: true,
      errors: null,
      fails: null,
      borrows: 'Borrow successful'
    });
  });
  it('should not borrow book', () => {
    expect(bookReducer(borrowBookInitialState, {
      type: actionTypes.BORROW_BOOK_UNSUCCESSFUL,
      payload: 'Borrow unsuccessful',
    })).toEqual({
      success: false,
      errors: null,
      fails: 'Borrow unsuccessful',
      borrows: null
    });
  });
});

describe('Return book', () => {
  it('should return a book', () => {
    expect(bookReducer(returnBookInitialState, {
      type: actionTypes.RETURNED_BOOK_SUCCESSFUL,
      payload: 'Return successful',
    })).toEqual({
      success: true,
      errors: null,
      fails: null,
      returned: 'Return successful'
    });
  });
  it('should not return book', () => {
    expect(bookReducer(returnBookInitialState, {
      type: actionTypes.RETURNED_BOOK_UNSUCCESSFUL,
      payload: 'Return unsuccessful',
    })).toEqual({
      success: false,
      errors: null,
      fails: 'Return unsuccessful',
      returned: null
    });
  });
});

describe('Get borrowed books', () => {
  it('should retrieve books borrowed by a user', () => {
    expect(bookReducer(borrowByUserInitialState, {
      type: actionTypes.GET_USER_BORROW_SUCCESSFUL,
      payload: {
        borrows: getAUserBorrows.borrowed[0],
        pageCount: 1
      }
    })).toEqual({
      success: true,
      errors: null,
      allBorrows: getAUserBorrows.borrowed[0],
      pageCount: 1
    });
  });
  it('should not retrieve books borrowed by a user', () => {
    expect(bookReducer(borrowByUserInitialState, {
      type: actionTypes.GET_USER_BORROW_UNSUCCESSFUL,
      payload: 'Borrow not retrieved',
    })).toEqual({
      success: false,
      errors: 'Borrow not retrieved',
      allBorrows: null,
      pageCount: null
    });
  });
});

describe('Get returned books', () => {
  it('should retrieve books returned by a user', () => {
    expect(bookReducer(returnByUserInitialState, {
      type: actionTypes.GET_USER_RETURNED_SUCCESSFUL,
      payload: {
        returnings: getAUserBorrows.borrowed[1],
        pageCount: 1
      }
    })).toEqual({
      success: true,
      errors: null,
      returnings: getAUserBorrows.borrowed[1],
      pageCount: 1
    });
  });
  it('should not retrieve books returned by a user', () => {
    expect(bookReducer(returnByUserInitialState, {
      type: actionTypes.GET_USER_RETURNED_UNSUCCESSFUL,
      payload: 'Return not retrieved',
    })).toEqual({
      success: false,
      errors: 'Return not retrieved',
      returnings: null,
      pageCount: null
    });
  });
});

describe('Get all borrowed books', () => {
  it('should retrieve all books borrowed by a user', () => {
    expect(bookReducer(allBorrowsInitialState, {
      type: actionTypes.GET_ALL_BORROW_SUCCESSFUL,
      payload: {
        borrowers: getAllBorrows.borrowers,
        pageCount: 1
      }
    })).toEqual({
      success: true,
      errors: null,
      borrowers: getAllBorrows.borrowers,
      pageCount: 1
    });
  });
  it('should not retrieve all books borrowed by a user', () => {
    expect(bookReducer(allBorrowsInitialState, {
      type: actionTypes.GET_ALL_BORROW_UNSUCCESSFUL,
      payload: 'Borrow not retrieved',
    })).toEqual({
      success: false,
      errors: 'Borrow not retrieved',
      borrowers: null,
      pageCount: null
    });
  });
});

describe('Get all returned books', () => {
  it('should retrieve all books returned by a user', () => {
    expect(bookReducer(allReturnedInitialState, {
      type: actionTypes.GET_ALL_RETURNED_SUCCESSFUL,
      payload: {
        returners: getAllReturned.returners,
        pageCount: 1
      }
    })).toEqual({
      success: true,
      errors: null,
      returners: getAllReturned.returners,
      pageCount: 1
    });
  });
  it('should not retrieve all books returned by a user', () => {
    expect(bookReducer(allReturnedInitialState, {
      type: actionTypes.GET_ALL_RETURNED_UNSUCCESSFUL,
      payload: 'Return not retrieved',
    })).toEqual({
      success: false,
      errors: 'Return not retrieved',
      returners: null,
      pageCount: null
    });
  });
});

describe('Confirm borrow', () => {
  it('should confirm a borrowed book', () => {
    expect(bookReducer(confirmBorrowInitialState, {
      type: actionTypes.CONFIRM_BORROW_SUCCESSFUL,
      payload: {
        message: 'Borrow confirmed',
        borrowId: 1
      }
    })).toEqual({
      success: true,
      errors: null,
      confirmBorrow: 'Borrow confirmed',
      clickedBorrowList: [...confirmBorrowInitialState, 1]
    });
  });
  it('should not confirm a borrowed book', () => {
    expect(bookReducer(confirmBorrowInitialState, {
      type: actionTypes.CONFIRM_BORROW_UNSUCCESSFUL,
      payload: 'Borrow not confirmed',
    })).toEqual({
      success: false,
      errors: 'Borrow not confirmed',
      confirmBorrow: null,
      clickedBorrowList: []
    });
  });
});

describe('Confirm return', () => {
  it('should confirm a returned book', () => {
    expect(bookReducer(confirmReturnInitialState, {
      type: actionTypes.CONFIRM_RETURNED_SUCCESSFUL,
      payload: {
        message: 'Borrow confirmed',
        borrowId: 1
      }
    })).toEqual({
      success: true,
      errors: null,
      confirmReturn: 'Borrow confirmed',
      clickedReturnedBorrowList: [...confirmReturnInitialState, 1]
    });
  });
  it('should not confirm a returned book', () => {
    expect(bookReducer(confirmReturnInitialState, {
      type: actionTypes.CONFIRM_RETURNED_UNSUCCESSFUL,
      payload: 'Return not confirmed',
    })).toEqual({
      success: false,
      errors: 'Return not confirmed',
      confirmReturn: null,
      clickedReturnedBorrowList: []
    });
  });
});

describe('Initial state', () => {
  it('should return initialstate when no case matches or is provided', () => {
    expect(bookReducer(bookInitialState, {
    })).toEqual({
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
    });
  });
});