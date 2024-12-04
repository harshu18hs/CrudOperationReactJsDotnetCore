const logger = require('./loggerBackend'); // Import the logger

const errorMiddleware = (err, req, res, next) => {
  // Log the error message with the request method and URL
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  
  // Send a generic error response
  res.status(500).json({ message: 'An internal server error occurred.' });
};

module.exports = errorMiddleware;
