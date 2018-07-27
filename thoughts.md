# Flock Test API
## Layers

API <=> Controller <=> Service <=> Original API

### Service
 
* Simple in-memory cache based on key lookup.
* Could be swapped out for Redis (my choice) later on if required without impacting other layers.  Eg, scaling.
* Read-through cache so that any end-point call will result in cache update, assuming that a call returns.
* This is for stability and not speed, so return the true value, unless the db fails.
* Should try and fill cache on start-up in case client call results in original API returning error initially 

### Controller

* Decouple from the API end-point for testing
* Simply pass through calls directly to the service layer
* Should return 503 until cache initialised

### API

* API Blueprint tested against 
* Does not require authentication
* Should still use Express Helmet

## Notes

* This application is designed to bolster the availability of the original API by caching.  At present a custom in-memory cache is being used as the size of the dataset is so small. As this grows Redis can be layered in if necessary.  We'll add a note to the cache.js
* It should ba consistent and return errors only when it needs to.
* It should follow best practices.
* There is only one route version.  accept-version header should be used, but only when needed.  We'll set this up in the project and add a note.
* Using latest version of Node, although in production may be better to run with latest LTS version