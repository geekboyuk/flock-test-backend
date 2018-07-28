const compression = require('compression');
require('dotenv').config();
const express = require('express');

const controllers = require('./controllers');
const { api, cache, logger } = require('./services');
const routes = require('./routes');


const robustApi = api(process.env.HOST_API, cache);

// Fill the cache before making the service available to clients
robustApi
  .fillCache(process.env.HOST_RETRIES)
  .catch(err => {
    console.error(err);
    logger.error('Could not fill initial cache, exiting', { err });
    process.exit(1);
  })
  .then(() => {

    const app = express();
    
    // gzip compression for Express - should be done in reverse proxy really
    app.use(compression());
    
    // Define the entry points into the application
    routes.initialise(app, controllers(robustApi), robustApi);
    
    // Finally listen to port
    const port = process.env.PORT;
    app.listen(port, () => logger.info('Drone API start', { port }));
  })
  .catch(err => {
    console.error(err);
    logger.error('API error', err);
    process.exit(1);
  });
