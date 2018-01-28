const getAllUsers = [
  {
    id: 1,
    fullname: 'Emmanuel Shaibu',
    username: 'Shaibu',
    email: 'Shaibu@gmail.com',
    phoneNo: '09000000001',
    userImage: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.jpg',
    isAdmin: false,
    isSocial: false,
    regType: 'regular',
    level: 'silver',
    createdAt: '2018-01-08T14:58:33.891Z',
    updatedAt: '2018-01-08T14:58:33.891Z',
  },
  {
    id: 2,
    fullname: 'Emmanuel Victor',
    username: 'Victor',
    email: 'Victor@gmail.com',
    phoneNo: '09000000004',
    userImage: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pj.jpg',
    isAdmin: true,
    isSocial: true,
    regType: 'gmail',
    level: 'platinum',
    createdAt: '2018-02-08T14:58:33.891Z',
    updatedAt: '2018-02-08T14:58:33.891Z',
  }
];

const getOneUser = [
  {
    id: 1,
    fullname: 'Emmanuel Shaibu',
    username: 'Shaibu',
    email: 'Shaibu@gmail.com',
    phoneNo: '09000000001',
    userImage: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.jpg',
    isAdmin: false,
    isSocial: false,
    regType: 'regular',
    level: 'silver',
    createdAt: '2018-01-08T14:58:33.891Z',
    updatedAt: '2018-01-08T14:58:33.891Z',
  }
];

const getAllCategories = [
  {
    id: 1,
    categoryName: 'Science'
  },
  {
    id: 2,
    categoryName: 'Fiction'
  }
];


const getAllBooks = {
  books: [
    {
      id: 1,
      bookName: 'Brave Heart',
      author: 'Townsend Jnr',
      categoryId: 1,
      publishYear: new Date('1991/08/06'),
      isbn: 'ISBN43333334',
      pages: 506,
      bookCount: 2,
      bookContent: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.pdf',
      bookImage: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.jpg',
      description: 'Inspiring story of a young scottish barbarian',
      countBorrow: 2
    },
    {
      id: 2,
      bookName: 'Crooked',
      author: 'Kent Jnr',
      categoryId: 1,
      publishYear: new Date('1991/06/04'),
      isbn: 'ISBN43336634',
      pages: 506,
      bookCount: 2,
      bookContent: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.pdf',
      bookImage: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.jpg',
      description: 'Inspiring story of a young scottish barbarian',
      countBorrow: 2
    }
  ]
};

const getABook = [
  {
    id: 1,
    bookName: 'Brave Heart',
    author: 'Townsend Jnr',
    categoryId: 1,
    publishYear: new Date('1991/08/06'),
    isbn: 'ISBN43333334',
    pages: 506,
    bookCount: 2,
    bookContent: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.pdf',
    bookImage: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.jpg',
    description: 'Inspiring story of a young scottish barbarian',
    countBorrow: 2
  }
];

const getAUserBorrows = {
  borrowed: [
    {
      id: 1,
      UserId: 2,
      bookId: 1,
      borrowDate: '2018-01-08T14:58:33.891Z',
      borrowStatus: true,
      collectionDate: '2018-01-08T14:58:33.891Z',
      expectedReturn: '2018-01-11T14:58:33.891Z',
      actualReturn: null,
      returned: false,
      createdAt: '2018-01-08T14:58:33.891Z',
      updatedAt: '2018-01-08T14:58:33.891Z',
    },
    {
      id: 1,
      UserId: 2,
      bookId: 1,
      borrowDate: '2018-01-08T14:58:33.891Z',
      borrowStatus: true,
      collectionDate: '2018-01-08T14:58:33.891Z',
      expectedReturn: '2018-01-11T14:58:33.891Z',
      actualReturn: '2018-01-10T17:30:00.891Z',
      returned: true,
      createdAt: '2018-01-08T14:58:33.891Z',
      updatedAt: '2018-01-08T14:58:33.891Z',
    }
  ]
};

const getAllBorrows = {
  borrowers: [
    {
      id: 1,
      UserId: 2,
      bookId: 1,
      borrowDate: '2018-01-08T14:58:33.891Z',
      borrowStatus: true,
      collectionDate: '2018-01-08T14:58:33.891Z',
      expectedReturn: '2018-01-11T14:58:33.891Z',
      actualReturn: null,
      returned: false,
      createdAt: '2018-01-08T14:58:33.891Z',
      updatedAt: '2018-01-08T14:58:33.891Z',
    },
    {
      id: 1,
      UserId: 2,
      bookId: 1,
      borrowDate: '2018-01-09T14:58:33.891Z',
      borrowStatus: true,
      collectionDate: '2018-01-09T14:58:33.891Z',
      expectedReturn: '2018-01-16T14:58:33.891Z',
      actualReturn: null,
      returned: false,
      createdAt: '2018-01-08T14:58:33.891Z',
      updatedAt: '2018-01-08T14:58:33.891Z',
    }
  ]
};

const getAllReturned = {
  returners: [
    {
      id: 1,
      UserId: 2,
      bookId: 1,
      borrowDate: '2018-01-08T14:58:33.891Z',
      borrowStatus: true,
      collectionDate: '2018-01-08T14:58:33.891Z',
      expectedReturn: '2018-01-11T14:58:33.891Z',
      actualReturn: null,
      returned: false,
      createdAt: '2018-01-08T14:58:33.891Z',
      updatedAt: '2018-01-08T14:58:33.891Z',
    },
    {
      id: 1,
      UserId: 2,
      bookId: 1,
      borrowDate: '2018-01-09T14:58:33.891Z',
      borrowStatus: true,
      collectionDate: '2018-01-09T14:58:33.891Z',
      expectedReturn: '2018-01-16T14:58:33.891Z',
      actualReturn: null,
      returned: false,
      createdAt: '2018-01-08T14:58:33.891Z',
      updatedAt: '2018-01-08T14:58:33.891Z',
    }
  ]
};

const usersInitialState = {
  success: false,
  users: [],
  errors: null,
  pageCount: null
};

const userInitialState = {
  success: false,
  user: [],
  errors: null,
};

const passwordState = {
  success: false,
  errors: null,
  fails: null
};

const updateUserState = {
  success: false,
  errors: null,
  fails: null
};

const signUpInitialState = {
  success: false,
  errors: null,
  fails: null,
};

const signInInitialState = {
  success: false,
  googleSigned: null,
  fails: null
};

const categoryInitialState = {
  success: false,
  errors: null,
  fails: null,
  categories: []
};

const bookInitialState = {
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

const addBookInitialState = {
  success: false,
  passes: null,
  errors: null
};

const updateBookInitialState = {
  success: false,
  fails: null,
  errors: null
};

const getAllBookInitialState = {
  success: false,
  errors: null,
  books: [],
  pageCount: null
};

const getABookInitialState = {
  success: false,
  errors: null,
  book: null
};


const deleteBookInitialState = {
  success: false,
  errors: null,
  fails: null,
  books: []
};

const borrowBookInitialState = {
  success: false,
  errors: null,
  fails: null,
  borrows: null
};

const returnBookInitialState = {
  success: false,
  errors: null,
  fails: null,
  returned: null
};

const borrowByUserInitialState = {
  success: false,
  errors: null,
  allBorrows: null,
  pageCount: null
};

const returnByUserInitialState = {
  success: false,
  errors: null,
  returnings: null,
  pageCount: null
};

const allBorrowsInitialState = {
  success: false,
  errors: null,
  borrowers: null,
  pageCount: null
};

const allReturnedInitialState = {
  success: false,
  errors: null,
  returners: null,
  pageCount: null
};

const confirmBorrowInitialState = {
  success: false,
  errors: null,
  confirmBorrow: null,
  clickedBorrowList: []
};

const confirmReturnInitialState = {
  success: false,
  errors: null,
  confirmReturn: null,
  clickedReturnedBorrowList: []
};

export {
  getAllUsers,
  getOneUser,
  usersInitialState,
  userInitialState,
  updateUserState,
  passwordState,
  signUpInitialState,
  signInInitialState,
  categoryInitialState,
  getAllCategories,
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
};