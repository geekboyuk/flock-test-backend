const fetch = require('node-fetch');

const logger = require('./logger');

const normaliseDrone = result => ({
    id: result.droneId,
    numFlights: result.numFlights,
    name: result.name,
    currency: result.currency,
    price: result.price,
    numCrashes: result.numCrashes,
});

const normaliseDrones = result => result.map(normaliseDrone);

const handleResponse = (res) => {
  logger.debug('Fetch response', { status: res.status });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const all = (location) => {
  const url = `${location}/api/v0/drones`;
  
  const options = { 
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  logger.debug(`API calling ${url}`, options);

  return fetch(url, options)
    .then(handleResponse)
    .then(normaliseDrones);
};

const get = (location, id) => {
  const url = `${location}/api/v0/drone/${id}`;

  const options = { 
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  logger.debug(`API calling ${url}`, options);
  
  return fetch(url, options)
    .then(handleResponse)
    .then(normaliseDrone);
};

const api = (location) => ({
  all: () => all(location),
  get: (id) => get(location, id),
});

module.exports = api;

