const { transports, createLogger, format } = require('winston');

// I'm using Winston for logging, I've typically used Bunyan in the past, purely to see what it's like
// Can write errors directly to log files, but we're running on PaaS, so will log to console
// We want one global instance of the logger, so create it once and return it

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;