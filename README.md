# Portal front-end core
This the core of the front-end of the portal, on in other words: the **user's starting point**. This core **loads all modules**, and provides **general services on the window scope** in order to be able to communicate across modules.

## How to add a module
### What should your module look like
Each module is a self-contained website, with its own technologies.

It should adhere to these few principles:
* it needs one entrance page
* in order to have the same look and feel as other modules, it needs to extend the stylesheets in the npm module **stijnhooft-portal-front-end-library**.
* in order to communicate with other modules via the front-end, it can use the stylesheets in the npm module **stijnhooft-portal-front-end-library**.

### How to define which modules should be loaded
- Several properties should be added to the configuration files in [the portal-config-data Github](https://github.com/stainii/portal-config-data). Make sure to push the changes to the **master branch**.

````yaml
modules:
  - name: Housagotchi
    url: 'http://localhost:8080/portal/housagotchi'
  - name: module2
    ...
````
- Send a POST (authenticated with HTTP Basic authentication) to /portal/core/manage/refresh

That should be it! The core module will query the Github repo, and discover all urls to all modules. 