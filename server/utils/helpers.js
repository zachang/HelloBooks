const handleError = (err, res) => {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Process failed' });
};


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
 * Determines the expected return date for users based on their level
 *@function determineUserReturnDate
 * @param {string} level
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

export { handleError, generatePaginationMeta, determineUserReturnDate } ;


