const version1 = require('./v1');

const initialise = (app, controllers) => 
  version1.initialise(app, controllers);

module.exports = {
  initialise,
};