const test = require('tape');

const cache = require('../../src/services/cache');

test('Cache should be empty initially', (t) => {
  t.plan(2);

  t.deepEqual(cache.all(), []);
  t.equal(cache.size(), 0);
});

test('Clearing an empty cache should empty the cache', (t) => {
  t.plan(2);

  cache.clear();

  t.deepEqual(cache.all(), {});
  t.equal(cache.size(), 0);
});

test('Clearing a cache with items should empty the cache', (t) => {
  t.plan(3);

  cache.clear();

  cache.add(1, 'Item 1');
  cache.add(2, 'Item 2');

  t.equal(cache.size(), 2);
  cache.clear();
  t.deepEqual(cache.all(), {});
  t.equal(cache.size(), 0);
});

test('Adding one item should increase cache size', (t) => {
  t.plan(2);

  // Ensure the cache is emtpty
  cache.clear();

  t.equal(cache.size(), 0);
  cache.add(1, 'Item 1');
  t.equal(cache.size(), 1);
});

test('The cache should remain intact if manipulated result of all', (t) => {
  t.plan(2);

  cache.clear();
  cache.add(1, 'Item 1');
  cache.add(2, 'Item 2');

  const before = cache.all();
  
  const after = cache.all();
  after['blah'] = 'Hello';

  const expected = {
    1: 'Item 1',
    2: 'Item 2',
  };

  t.deepEqual(before, expected);
  t.notDeepEqual(after, expected);
});

test('Can fetch an item from the cache', (t) => {
  t.plan(1);

  cache.clear();
  cache.add(1, 'Item 1');

  const expected = 'Item 1';

  t.equal(cache.get(1), expected);
});

test('Can store and return multiple items from the cache', (t) => {
  t.plan(2);

  cache.clear();
  cache.add(1, 'Item 1');
  cache.add(2, 'Item 2');

  const expected = {
    1: 'Item 1',
    2: 'Item 2',
  };

  t.equal(cache.get(1), expected[1]);
  t.equal(cache.get(2), expected[2]);
});

test('Trying to get a non-existant item from cache throws RangeError', (t) => {
  t.plan(2);

  cache.clear();
  cache.add(1, 'Item 1');
  try {
    cache.get(2);
  } catch (err) {
    t.ok(err instanceof RangeError, 'Should be RangeError');
  }

  t.equal(cache.get(2), expected[2]);
});