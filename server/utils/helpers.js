const handleError = (err, res) => {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Borrow failed' });
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

export { handleError, generatePaginationMeta } ;

