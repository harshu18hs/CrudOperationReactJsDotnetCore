const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

const logDirectory = path.join('D:', 'React JS', 'dummy-react', 'logs');
if (!fs.existsSync(logDirectory)) {
  console.log('Logs directory does not exist, creating it...');
  fs.mkdirSync(logDirectory, { recursive: true });
} else {
  console.log('Logs directory already exists.');
} 

const logger = createLogger({
  level: 'info', 
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(), 
    new transports.File({
      filename: path.join(logDirectory, 'app.log'), 
    }),
  ],
});

module.exports = logger;
