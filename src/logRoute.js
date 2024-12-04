const express = require('express');
const logger = require('./loggerBackend');
const router = express.Router();

// Post logs from the frontend
router.post('/logs', (req, res) => {
  const { message } = req.body;
  if (message) {
    // Log the message received from the frontend
    logger.info(`Frontend Log: ${message}`);
    res.status(200).send('Log received');
  } else {
    res.status(400).send('No message provided');
  }
});

module.exports = router;
