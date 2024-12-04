const express = require('express');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./App').default;
const logger = require('./loggerBackend'); // Import the logger
const logRoute = require('./logRoute');
const app = express();

// Test log message on server startup
logger.info('Server is starting...');

app.use(logRoute);

// React rendering route
app.get('*', (req, res) => {
  try {
    const appHTML = ReactDOMServer.renderToString(<App />);
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>React SSR</title>
        </head>
        <body>
          <div id="root">${appHTML}</div>
        </body>
      </html>
    `);
    logger.info('React App rendered successfully.');
  } catch (error) {
    logger.error('Error rendering React App:', error);
    res.status(500).send('An error occurred while rendering the app.');
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
