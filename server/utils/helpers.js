const handleError = (err, res) => {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(400).json({ message: 'Borrow failed' });
};

export default handleError;

