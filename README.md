# portal-front-end-core
This the core of the front-end of the portal, on in other words: the **user's starting point**. This core **loads all modules**, and provides **general services on the window scope** in order to be able to communicate across modules.

## How to add a module
### What should your module look like
This module should
* be a (set of) React component(s)
* provide one React component as entry point
* all code must be bundled in **one js** and **one css file**. This also **includes any libraries, including React itself**.

### How to define which modules should be loaded
- The url of the js and css file should be added to the configuration files in [the portal-config-data Github](https://github.com/stainii/portal-config-data). Make sure to push the changes to the **master branch**.
- Send a POST (authenticated with HTTP Basic authentication) to /portal/core/manage/refresh

That should be it! The core module will query the Github repo, and discover all urls to all modules.

## Shared services
In order for the modules to talk to each other, the core module offers services on the **global/window scope**.

* *events*: an event emitter. [More information.](https://www.npmjs.com/package/event-emitter-es6) 