const compression = require('compression');
const express = require('express');

const controllers = require('./controllers');
const routes = require('./routes');
const { logger } = require('./helpers');

// TODO:
// We should wait for the cache to be filled prior allowing API calls
// For now I'm purely going to be creating the Express server so that I can
// start testing the endpoints against the API Blueprint

const app = express();

// gzip compression for Express - should be done in reverse proxy really
app.use(compression());

// Define the entry points into the application
routes.initialise(app, controllers);

// Finally listen to port 3000
const port = 3000;
app.listen(port, () => logger.info('Drone API start', { port }));