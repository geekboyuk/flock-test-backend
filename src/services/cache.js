// It should be relatively simple to replace this with calls
// to Redis if the cache needs to be more robust, the app needs
// to scale, or some persistence required

let cache = {};

const clear = () => {
  cache = {};
};

const size = () => Object.keys(cache).length;

// Return a copy of the cache, so can't manipulate it directly
const all = () => Object.assign({}, cache);

const add = (key, value) => {
  cache[key] = value;
};

const get = (key) => {
  if (!Object.keys(cache).includes(key)) {
    throw new RangeError(`Key ${key} not found in cache`);
  }

  return cache[key];
};

module.exports = {
  add,
  all,
  clear,
  get,
  size,
};