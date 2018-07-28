const pRetry = require('p-retry');

const hostApi = require('./hostApi');
const logger = require('./logger');

const addDroneToCache = (drone, cache) => cache.add(drone.id, drone);
const addDronesToCache = (drones, cache) => drones.map(drone => addDroneToCache(drone, cache));

const fillCache = async (api, retries, cache) => {
  cache.clear();

  logger.debug('FillCache attempting to get all drone data')

  // Hard fail on error
  const drones = await pRetry(
    api.all,
    { 
      onFailedAttempt: err => logger.verbose(err),
      retries,
    });

  addDronesToCache(drones, cache);
};

const all = async (api, cache) => {
  try {
    const drones = await api.all();

    // Only flush the cache if we've got results!
    cache.clear();
    addDronesToCache(drones, cache);
  } catch (err) {
    // not logger.error() as we know api is unstable
    logger.info('Error calling api.all', { name: err.name, error: err.message });
  }

  return cache.all();
};

const get = async (api, cache, id) => {
  try {
    const drone = await api.get(id);
    addDroneToCache(drone, cache)
  } catch (err) {
    // not logger.error() as we know api is unstable
    logger.info('Error calling api.get', { name: err.name, error: err.message }); 
  }

  const value = cache.get(id)
    return cache.get(id);
  return cache.get(id);
};

const robustApi = (location, cache) => {
  const api = hostApi(location);

  return {
    fillCache: (retries) => fillCache(api, retries, cache),
    all: () => all(api, cache),
    get: (id) => get(api, cache, id),
  };
};

module.exports = robustApi;