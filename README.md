# Questions from Flock

1. What assumptions did you have to make?
 
   After looking at the original API that the amount of data is small and will remain small for the time being.  There are currently 12 items returned.  For this reason, introducing a dependency, such as Redis feels overkill, at this stage.

   Although the time limit of 4 hours was only as a guide, I need to ensure that I'm close to this time to complete.  For this reason I am looking at the core areas of importance, as it appears in the task specification, especially in terms of pinch-points, in order of importance:

   1. Instability of original API
   2. Poor documentation
   3. Inconsistant responses
   4. Headers returned not to best practice

   It was also assumed that the caching layer was purely for stability and not performance.  This is why I did not simply set the cache up as lazy loading.  It's also why I didn't create a simple read-through cache.

   I've also assumed that all developers and environments are running on Linux or MacOS.  This is due to differences in command line calls.  I've done this purely for speed of coding.

2. Which technologies did you choose? Why?

   As documentation of the API was mentioned as a weakness, I wanted to ensure that the API was properly documented.  For this reason I created an API Blueprint, for which documentation can be generated with a tool, such as Aglio.  
   
   API Documentation can become out of date with the end-points that the define.  I could have used Swagger instead of API Blueprint, and generated the end-points, however, I wanted full control over the definitions.  Instead I plan to create tests to ensure the documentation matches the exposed endpoints and use in CI.  I'm personally not keen on auto-generated code in production, as if it fails, it's typical to be during a time of crisis.

3. What technical compromises did you have to make in order to achieve your solution? What is the severity of this tech debt, and what would a path to resolving it look like?

   Picking to create a custom caching mechanism meant more tests had to be created, instead of using a known and robust solution.  It should be easily replacable if required in the future.

   Although the original API included versioning, I've removed it for simplicity.  In the future the header ```accept-version``` should be used.  I've created the end-point structure to make this obvious.

4. How do we run your code?

   On your local machine simply:
   ```npm start```

   This is also running at:
   ```herokuapp.com```


5. What future features do you think we might be able to build based on this API?

> Note: thoughts.md shows my initial thinking upon reading the task specification