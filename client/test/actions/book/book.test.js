import thunk from 'redux-thunk';
import { configure } from 'enzyme';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import * as mockData from '../../mockDataActions';
import * as apiEndPoints from '../../apiEndPoints';
import actionTypes from '../../../src/actions/actionTypes';
import {
  getBookAction,
  getOneBookAction,
  deleteBookAction,
  borrowBookAction,
  returnBookAction,
  viewUserBorrowAction,
  viewUserReturnAction,
  viewAllBorrowAction,
  viewAllReturnedAction,
  confirmReturnAction,
  confirmBorrowAction
} from '../../../src/actions/bookAction';


import mockSessionStorage from '../../mockDataStorage';

window.sessionStorage = mockSessionStorage;


const { expect } = chai;
configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});


describe('THUNK FUNCTIONS', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });


  /** ****************************************** */
  /** ************* BOOK ACTIONS ************** */
  /** **************************************** */

  // Get all books
  it('should retrieve all books', async (done) => {
    const addBookData = mockData.bookAction;
    const paginationMeta = mockData.paginationMeta;
    moxios.stubRequest(apiEndPoints.getBookAction, {
      status: 200,
      response: {
        books: addBookData,
        paginationMeta
      }
    });

    const expectedAction = {
      type: actionTypes.GETBOOKS_SUCCESSFUL,
      books: addBookData,
      paginationMeta: {
        pageCount: 1
      }
    };

    // Dispatch
    await store.dispatch(getBookAction(1, 0, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal(expectedAction.type);
      expect(actions[0].books).to.equal(expectedAction.books);
      expect(actions[0].pageCount).to.equal(expectedAction.paginationMeta.pageCount);
    });
    done();
  });

  it('should not retrieve books', async (done) => {
    moxios.stubRequest(apiEndPoints.getBookAction, {
      status: 400,
      response: {
        message: 'No book retrieved'
      }
    });

    const expectedAction = {
      type: actionTypes.GETBOOKS_UNSUCCESSFUL,
      payload: {
        message: 'No book retrieved'
      }
    };

    // Dispatch
    await store.dispatch(getBookAction(1, 0, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).to.equal(expectedAction.type);
      expect(actions[1].message).to.equal(expectedAction.message);
    });
    done();
  });

  // Get one book
  it('should retrieve a book', async (done) => {
    const getOnebook = mockData.getOneBookAction;
    moxios.stubRequest(apiEndPoints.getOneBookAction, {
      status: 200,
      response: {
        book: getOnebook
      }
    });

    const expectedAction = {
      type: actionTypes.GETONEBOOK_SUCCESSFUL,
      book: getOnebook
    };

    // Dispatch
    await store.dispatch(getOneBookAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[2].type).to.equal(expectedAction.type);
      expect(actions[2].payload).to.equal(expectedAction.book);
    });
    done();
  });

  it('should not retrieve book', async (done) => {
    moxios.stubRequest(apiEndPoints.getOneBookAction, {
      status: 400,
      response: {
        message: 'No book retrieved'
      }
    });

    const expectedAction = {
      type: actionTypes.GETONEBOOK_UNSUCCESSFUL,
      payload: 'No book retrieved'
    };

    // Dispatch
    await store.dispatch(getOneBookAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[3].type).to.equal(expectedAction.type);
      expect(actions[3].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Delete book
  it('should delete book', async (done) => {
    moxios.stubRequest(apiEndPoints.deleteBookAction, {
      status: 200,
      response: 1
    });

    const expectedAction = {
      type: actionTypes.DELETE_BOOK_SUCCESSFUL
    };

    // Dispatch
    await store.dispatch(deleteBookAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[4].type).to.equal(expectedAction.type);
    });
    done();
  });

  it('should not delete book', async (done) => {
    moxios.stubRequest(apiEndPoints.deleteBookAction, {
      status: 4000,
      response: {
        message: 'Book not deleted'
      }
    });

    const expectedAction = {
      type: actionTypes.DELETE_BOOK_UNSUCCESSFUL,
      payload: 'Book not deleted'
    };

    // Dispatch
    await store.dispatch(deleteBookAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[5].type).to.equal(expectedAction.type);
      expect(actions[5].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Borrow book
  it('should borrow book', async (done) => {
    moxios.stubRequest(apiEndPoints.borrowBookAction, {
      status: 200,
      response: {
        message: 'Book borrowed'
      }
    });

    const expectedAction = {
      type: actionTypes.BORROW_BOOK_SUCCESSFUL,
      payload: 'Book borrowed'
    };

    // Dispatch
    await store.dispatch(borrowBookAction(1, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[6].type).to.equal(expectedAction.type);
      expect(actions[6].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  it('should not borrow book', async (done) => {
    moxios.stubRequest(apiEndPoints.borrowBookAction, {
      status: 400,
      response: {
        message: 'Book not borrowed'
      }
    });

    const expectedAction = {
      type: actionTypes.BORROW_BOOK_UNSUCCESSFUL,
      payload: 'Book not borrowed'
    };

    // Dispatch
    await store.dispatch(borrowBookAction(1, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[7].type).to.equal(expectedAction.type);
      expect(actions[7].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Return book
  it('should return book', async (done) => {
    moxios.stubRequest(apiEndPoints.returnBookAction, {
      status: 200,
      response: {
        message: 'Book returned'
      }
    });

    const expectedAction = {
      type: actionTypes.RETURNED_BOOK_SUCCESSFUL,
      payload: 'Book returned'
    };

    // Dispatch
    await store.dispatch(returnBookAction(1, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[8].type).to.equal(expectedAction.type);
      expect(actions[8].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  it('should not return book', async (done) => {
    moxios.stubRequest(apiEndPoints.returnBookAction, {
      status: 400,
      response: {
        message: 'Book not returned'
      }
    });

    const expectedAction = {
      type: actionTypes.RETURNED_BOOK_UNSUCCESSFUL,
      payload: 'Book not returned'
    };

    // Dispatch
    await store.dispatch(returnBookAction(1, 1)).then(() => {
      const actions = store.getActions();
      expect(actions[9].type).to.equal(expectedAction.type);
      expect(actions[9].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Get all borrowed books for a user
  it('should retrieve all borrowed books by a user', async (done) => {
    const getUserBorrowed = mockData.getUserBorrowed;
    const paginationMeta = mockData.paginationMeta;
    moxios.stubRequest(apiEndPoints.viewUserBorrowAction, {
      status: 200,
      response: {
        borrowed: getUserBorrowed,
        paginationMeta
      }
    });

    const expectedAction = {
      type: actionTypes.GET_USER_BORROW_SUCCESSFUL,
      borrows: getUserBorrowed,
      paginationMeta: {
        pageCount: 1
      }
    };

    // Dispatch
    await store.dispatch(viewUserBorrowAction(1, 1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[10].type).to.equal(expectedAction.type);
      expect(actions[10].payload.borrows).to.equal(expectedAction.borrows);
      expect(actions[10].payload.pageCount).to.equal(expectedAction.paginationMeta.pageCount);
    });
    done();
  });

  it('should not retrieve all borrowed books by a user', async (done) => {
    moxios.stubRequest(apiEndPoints.viewUserBorrowAction, {
      status: 400,
      response: {
        message: 'Borrows not retrieved'
      }
    });

    const expectedAction = {
      type: actionTypes.GET_USER_BORROW_UNSUCCESSFUL,
      payload: 'Borrows not retrieved'
    };

    // Dispatch
    await store.dispatch(viewUserBorrowAction(1, 1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[11].type).to.equal(expectedAction.type);
      expect(actions[11].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Get all returned books for a user
  it('should retrieve all returned books by a user', async (done) => {
    const getUserReturned = mockData.getUserReturned;
    const paginationMeta = mockData.paginationMeta;
    moxios.stubRequest(apiEndPoints.viewUserReturnAction, {
      status: 200,
      response: {
        borrowed: getUserReturned,
        paginationMeta
      }
    });

    const expectedAction = {
      type: actionTypes.GET_USER_RETURNED_SUCCESSFUL,
      returnings: getUserReturned,
      paginationMeta: {
        pageCount: 1
      }
    };

    // Dispatch
    await store.dispatch(viewUserReturnAction(1, 1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[12].type).to.equal(expectedAction.type);
      expect(actions[12].payload.returnings).to.equal(expectedAction.returnings);
      expect(actions[12].payload.pageCount).to.equal(expectedAction.paginationMeta.pageCount);
    });
    done();
  });

  it('should not retrieve all returned books by a user', async (done) => {
    moxios.stubRequest(apiEndPoints.viewUserReturnAction, {
      status: 400,
      response: {
        message: 'Borrows not retrieved'
      }
    });

    const expectedAction = {
      type: actionTypes.GET_USER_RETURNED_UNSUCCESSFUL,
      payload: 'Borrows not retrieved'
    };

    // Dispatch
    await store.dispatch(viewUserReturnAction(1, 1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[13].type).to.equal(expectedAction.type);
      expect(actions[13].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Get all borrowed books
  it('should retrieve all borrowed books', async (done) => {
    const getUserBorrowed = mockData.getUserBorrowed;
    const paginationMeta = mockData.paginationMeta;
    moxios.stubRequest(apiEndPoints.viewAllBorrowAction, {
      status: 200,
      response: {
        borrowers: getUserBorrowed,
        paginationMeta
      }
    });

    const expectedAction = {
      type: actionTypes.GET_ALL_BORROW_SUCCESSFUL,
      borrowers: getUserBorrowed,
      paginationMeta: {
        pageCount: 1
      }
    };

    // Dispatch
    await store.dispatch(viewAllBorrowAction(1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[14].type).to.equal(expectedAction.type);
      expect(actions[14].payload.borrowers).to.equal(expectedAction.borrowers);
      expect(actions[14].payload.pageCount).to.equal(expectedAction.paginationMeta.pageCount);
    });
    done();
  });

  it('should not retrieve all borrowed books', async (done) => {
    moxios.stubRequest(apiEndPoints.viewAllBorrowAction, {
      status: 400,
      response: {
        message: 'Borrows not retrieved'
      }
    });

    const expectedAction = {
      type: actionTypes.GET_ALL_BORROW_UNSUCCESSFUL,
      payload: 'Borrows not retrieved'
    };

    // Dispatch
    await store.dispatch(viewAllBorrowAction(1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[15].type).to.equal(expectedAction.type);
      expect(actions[15].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Get all returned books
  it('should retrieve all returned books', async (done) => {
    const getUserReturned = mockData.getUserReturned;
    const paginationMeta = mockData.paginationMeta;
    moxios.stubRequest(apiEndPoints.viewAllReturnedAction, {
      status: 200,
      response: {
        returners: getUserReturned,
        paginationMeta
      }
    });

    const expectedAction = {
      type: actionTypes.GET_ALL_RETURNED_SUCCESSFUL,
      returners: getUserReturned,
      paginationMeta: {
        pageCount: 1
      }
    };

    // Dispatch
    await store.dispatch(viewAllReturnedAction(1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[16].type).to.equal(expectedAction.type);
      expect(actions[16].payload.returners).to.equal(expectedAction.returners);
      expect(actions[16].payload.pageCount).to.equal(expectedAction.paginationMeta.pageCount);
    });
    done();
  });

  it('should not retrieve all returned books', async (done) => {
    moxios.stubRequest(apiEndPoints.viewAllReturnedAction, {
      status: 400,
      response: {
        message: 'Returned not retrieved'
      }
    });

    const expectedAction = {
      type: actionTypes.GET_ALL_RETURNED_UNSUCCESSFUL,
      payload: 'Returned not retrieved'
    };

    // Dispatch
    await store.dispatch(viewAllReturnedAction(1, 0)).then(() => {
      const actions = store.getActions();
      expect(actions[17].type).to.equal(expectedAction.type);
      expect(actions[17].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Confirm books returned
  it('should confirm books returned', async (done) => {
    const borrowId = 1;
    moxios.stubRequest(apiEndPoints.confirmReturnAction, {
      status: 200,
      response: {
        message: 'Borrow confirmed',
        borrowId
      }
    });

    const expectedAction = {
      type: actionTypes.CONFIRM_RETURNED_SUCCESSFUL,
      message: 'Borrow confirmed',
      borrowId
    };

    // Dispatch
    await store.dispatch(confirmReturnAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[18].type).to.equal(expectedAction.type);
      expect(actions[18].payload.message).to.equal(expectedAction.message);
      expect(actions[18].payload.borrowId).to.equal(expectedAction.borrowId);
    });
    done();
  });

  it('should not confirm books returned', async (done) => {
    moxios.stubRequest(apiEndPoints.confirmReturnAction, {
      status: 400,
      response: {
        message: 'Return not confirmed'
      }
    });

    const expectedAction = {
      type: actionTypes.CONFIRM_RETURNED_UNSUCCESSFUL,
      payload: 'Return not confirmed'
    };

    // Dispatch
    await store.dispatch(confirmReturnAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[19].type).to.equal(expectedAction.type);
      expect(actions[19].payload).to.equal(expectedAction.payload);
    });
    done();
  });

  // Confirm books borrowed
  it('should confirm books borrowed', async (done) => {
    const borrowId = 1;
    moxios.stubRequest(apiEndPoints.confirmBorrowAction, {
      status: 200,
      response: {
        message: 'Borrow confirmed',
        borrowId
      }
    });

    const expectedAction = {
      type: actionTypes.CONFIRM_BORROW_SUCCESSFUL,
      message: 'Borrow confirmed',
      borrowId
    };

    // Dispatch
    await store.dispatch(confirmBorrowAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[20].type).to.equal(expectedAction.type);
      expect(actions[20].payload.message).to.equal(expectedAction.message);
      expect(actions[20].payload.borrowId).to.equal(expectedAction.borrowId);
    });
    done();
  });

  it('should not confirm books returned', async (done) => {
    moxios.stubRequest(apiEndPoints.confirmBorrowAction, {
      status: 400,
      response: {
        message: 'Borrow not confirmed'
      }
    });

    const expectedAction = {
      type: actionTypes.CONFIRM_BORROW_UNSUCCESSFUL,
      payload: 'Borrow not confirmed'
    };

    // Dispatch
    await store.dispatch(confirmBorrowAction(1)).then(() => {
      const actions = store.getActions();
      expect(actions[21].type).to.equal(expectedAction.type);
      expect(actions[21].payload).to.equal(expectedAction.payload);
    });
    done();
  });
});