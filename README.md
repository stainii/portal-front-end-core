# Portal front-end core
This the core of the front-end of the portal, on in other words: the **user's starting point**. This core **loads all modules**, and provides **general services on the window scope** in order to be able to communicate across modules.

## How to add a module
### What should your module look like
This module should
* be a (set of) React component(s)
* provide one React component as entry point
* all code must be bundled in **one js** and **one css file**. This also **includes any libraries, including React itself**.
* all external resources, like images, a REST API, ..., must be provided under a **context root**.
    * This context root must **be unique for every module**.
    * This context root must **start with /portal/module/**
    * You must refer to this external resource as **/portal/module/[unique name]/[path to external resource]**

### How to define which modules should be loaded
- Several properties should be added to the configuration files in [the portal-config-data Github](https://github.com/stainii/portal-config-data). Make sure to push the changes to the **master branch**.

````yaml
modules:
  - name: Housagotchi
    js: 'http://localhost:8080/portal/housagotchi/bundle.js'
    css: 'http://localhost:8080/portal/housagotchi/bundle.css'
    host: http://localhost:8080/
    contextRoot: 'portal/module/housagotchi/'
  - name: module2
    ...
````
- Send a POST (authenticated with HTTP Basic authentication) to /portal/core/manage/refresh

That should be it! The core module will query the Github repo, and discover all urls to all modules. 