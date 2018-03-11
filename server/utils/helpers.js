/**
 * @description Handle errors
 *
 *@function handleError
 *
 * @param {object} err
 * @param {object} res
 *
 * @return {object} response
 */
const handleError = (err, res) => {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Process failed' });
};

/**
 * @description Creates pagination for data display
 *
 *@function randomCreate
 *
 * @param {int} dbResult
 * @param {int} limit
 * @param {int} offset
 *
 * @return {object} paginationMeta
 */
const generatePaginationMeta = (dbResult, limit, offset) => {
  const paginationMeta = {
    pageCount: Math.ceil(dbResult.count / limit),
    totalCount: dbResult.count,
    outputCount: dbResult.rows.length,
    pageSize: limit,
    currentPage: Math.floor(offset / limit) + 1
  };
  return paginationMeta;
};

/**
 *  @description Determines the expected return date for users by level
 *
 *@function determineUserReturnDate
 *
 * @param {string} level
 *
 * @return {date} newDate
 */
const determineUserReturnDate = (level) => {
  let newDate;
  if (level === 'silver') {
    newDate = new Date(Date.now() + (3 * 24 * 60 * 60 * 1000));
    return newDate;
  }
  if (level === 'gold') {
    newDate = new Date(Date.now() + (6 * 24 * 60 * 60 * 1000));
    return newDate;
  }
  if (level === 'platinum') {
    newDate = new Date(Date.now() + (9 * 24 * 60 * 60 * 1000));
    return newDate;
  }
};

/**
 * @descriptionCreates random values of arguments passed to it
 *
 *@function randomCreate
 *
 * @param {string} arg
 *
 * @return {string} input
 */
const randomCreate = (arg) => {
  let input = "";
  for (let i in arg) {
    i = Math.floor(Math.random() * arg.length);
    input += arg.charAt(i);
  }
  return input;
};

export {
  handleError,
  generatePaginationMeta,
  determineUserReturnDate,
  randomCreate
};
