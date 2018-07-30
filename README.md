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

    Wanted to call the host API multiple times, but there is no point in continually hammering it, so using library p-retry: It does exponential backoff and supports custom retry strategies for failed operations.

    I choose tape as my testing library.  It's a very simple testing library with a large amount of tool support.  Although it is simple it can be added to with other small libraries, eg sinon, as required.

3. What technical compromises did you have to make in order to achieve your solution? What is the severity of this tech debt, and what would a path to resolving it look like?

    Picking to create a custom caching mechanism meant more tests had to be created, instead of using a known and robust solution.  It should be easily replacable if required in the future.  The low number of items required to be stored made it appear to be a correct match for the problem.

    Although the original API included versioning, I've removed it for simplicity.  In the future the header ```accept-version``` should be used.  I've created the end-point structure to make this obvious.

    I added Dredd as a dependency, to make sure that the API documentation and calls were kept in sync.  It would be best to mock the host API and use this into a git pre-commit hook.  For now it is up to the developer to run it manually.  Simply ran out of time to fully implement.

    Ideally I'd have added more tests for the code I've written.  I've made sure I've added tests for the cache as it was custom written.  Ideally there would be more unit tests as well as integration and end-to-end tests.  Load testing would be useful to find the limits of a single host to prepare for scaling.

    Heroku was not set up with PM2 or another process manager.  If the application crashes then nothing will restarted.  Again, ran out of time.

    It was assumed that scaling would not be necessary and the primary reason for the API was to added stability to the calls.  Clustering could be set up but Redis would be necessary at that point, with each node communicating with it, as the central cache.

4. How do we run your code?

    On your local machine simply:
    `npm start`

    You will require an `.env` file to specify the actual host URL, number of retries on startup and port number.  This is not commited to git as they should be set as environment variables on the platform.  The following is an example file content:

    ```
    HOST_API = https://bobs-epic-drone-shack-inc.herokuapp.com
    HOST_RETRIES = 10
    PORT = 3000
    ```

    This is also running at:
    `https://flock-test-backend.herokuapp.com/`

    (with tests being run in CircleCI and master branch only deploying on success)


5. What future features do you think we might be able to build based on this API?

    I've normalised some of the data, by returning `id` instead of `droneId` and this could be taken further.  For example, the currencies could be normalised to an internal standard.  This would allow display in a number of formats if required.

    Have the currencies standardised could allow a risk profile to be calculated.  This could be as simple as taking the number of crashes and number of flights into consideration.

    Beyond this, an insurance cost could be calculated, which could take the risk profile and apply it with the cost of the device to calculate a premium.  This would not be enough to cover any legal costs however and be purely be for device replacement.

> Note: thoughts.md shows my initial thinking upon reading the task specification.  I also went over time due to spending time up front thinking through problem.
