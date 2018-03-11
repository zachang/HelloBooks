const signupAction = {
  fullname: 'Victor Mich',
  username: 'michy09',
  email: 'michy09@gmail.com',
  password: 'password',
  password_confirmation: 'password',
  phoneNo: '09066667777'
};

const signinAction = {
  username: 'michy09',
  password: 'password'
};

const googleSigninAction = {
  email: 'michy09@gmail.com'
};

const googleSigninResponse = {
  message: 'Gmail login successful'
};

const signupActionError = {
  fullname: 'Victor Mich',
  username: 'mi',
  email: 'michy09@gmail.com',
  password: 'password',
  password_confirmation: 'password',
  phoneNo: '09066667777'
};

const signupErrorResponse = {
  message: 'User not created'
};

const validationErrorResponse = {
  errors: 'Validation error'
};

const signinErrorResponse = {
  message: 'Invalid Credentials'
};

const updateUserErrorResponse = {
  message: 'User not updated'
};

const changePassUserErrorResponse = {
  message: 'Password not changed'
};

const getCategoryErrorResponse = {
  message: 'No category gotten'
};

const addCategoryErrorResponse = {
  message: 'Category not added'
};


const getUserAction = [
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

const paginationMeta = {
  pageCount: 1
};

const updateUserAction = {
  fullname: 'Skills Mich',
  username: 'michy09',
  email: 'michy09@gmail.com',
  userImage: 'http://res.cloudinary.com/hellobooks/image/upload/v1512745103/ury1qmurfpwkvw070pjl.jpg',
  phoneNo: '09066667788'
};

const changePasswordAction = {
  oldpassword: 'password',
  newpassword: 'password30',
  newpassword_confirmation: 'password30'
};

const addCategoryAction = {
  categoryName: 'Science',
};

const getCategoryAction = [
  {
    categoryName: 'Science'
  },
  {
    categoryName: 'Arts'
  }
];

const bookAction = {
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

const getOneBookAction = {
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
};


const addBookResponse = {
  message: 'Book created'
};

const getUserBorrowed = [
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
];

const getUserReturned = [
  {
    id: 1,
    UserId: 2,
    bookId: 1,
    borrowDate: '2018-01-08T14:58:33.891Z',
    borrowStatus: true,
    collectionDate: '2018-01-08T14:58:33.891Z',
    expectedReturn: '2018-01-11T14:58:33.891Z',
    actualReturn: null,
    returned: true,
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
    returned: true,
    createdAt: '2018-01-08T14:58:33.891Z',
    updatedAt: '2018-01-08T14:58:33.891Z',
  }
];


export {
  signupAction,
  signupActionError,
  signupErrorResponse,
  validationErrorResponse,
  signinAction,
  signinErrorResponse,
  googleSigninAction,
  googleSigninResponse,
  getUserAction,
  paginationMeta,
  updateUserAction,
  updateUserErrorResponse,
  changePasswordAction,
  changePassUserErrorResponse,
  addCategoryAction,
  getCategoryAction,
  addCategoryErrorResponse,
  getCategoryErrorResponse,
  bookAction,
  addBookResponse,
  getOneBookAction,
  getUserBorrowed,
  getUserReturned
};