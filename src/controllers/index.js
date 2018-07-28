const drone = require('./drone');

module.exports = (api) => ({
  drone: drone(api),
});