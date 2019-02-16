# Portal front-end
[![Build Status](https://server.stijnhooft.be/jenkins/buildStatus/icon?job=portal-front-end/master)](https://server.stijnhooft.be/jenkins/job/portal-front-end/job/master/)

This the front-end of the portal.

## Url
### In development
When building this app with profile **dev**, the url of the front-end will be **http://localhost:2001**.

The Angular base href will be "/".

### In production
When running in production, it is assumed that you **access the front-end through portal-proxy**.
This means that the url will be **https://*host-of-portal-proxy*:*port-of-portal-proxy*/front-end/**.

The Angular base href will be set to "/front-end/".


## How modular is this front-end?

### The first attempt: a true modular front-end
While the back-end functionality can be kept apart in separate components (if some supporting components are put in place), this is much harder in the front-end.
At first, I've tried to create a "real modular" front-end. 

* Every back-end module has its own front-end module (when needed).
* The front-end and back-end module are kept in the same Git repository, living nicely together.
* A front-end core component loads all these separate modules in one page.

Still, the user will access the app in one place only. This means I have to assemble all components in one app, the so called "core app".
This core app 
* is the access point
* contains a menu to go from one app to the other
* and displays the chosen module.

These are the options that I thought of, to realize this:

* **Option 1: use web components to load everything in the same domain.**
    * The Angular/React/Polymer/... needs to be loaded for every component, again and again
    * Static resources, like images, css, ... cannot be referenced relatively.
    * The manifest file still needs to be shared in a front-end-core component, which means it's still no completely autonomous commponent.
* **Option 2: use i-frames to keep everything in separate contexts**
    * The Angular/React/Polymer/... needs to be loaded for every component, again and again
    * I'll run into the safety limitations of cross-domain-origins pretty fast. For example: I cannot transfer a JWT token from one domain to another, unless I start using a proxy. In that case, I run into the same issues I have without option 1.
    * Frames look horrible on mobile. It will also be noticeable that the parent frame loads first, the i-frame next.

Neither options cut it. I want a highly-functioning **progressive web app**. 

### Current attempt: a single front-end, that consists of modules/web components with shared static resources
Ok, my conclusion is that a high-performing front-end cannot be split into completely separate modules, due to the design of the web.

The best second thing is to have **a single front-end**, but keep the different domains separated via **modules** or **web components**.

The unsplittable common part is kept in a single location. Efforts are made to keep these as small and clear as possible.

## The front-end's architecture
* The **core framework is written in Angular**.
    * At the moment of writing, this framework offers the best options regarding building a progressive web app.
    * Angular is also perfectly capable to load web components, which frees up my choice in front-end technologies.
* I can choose to write each module
    * in **Angular**
    * in **another technology**, as long as I can pack it in a **web component**
* All static resources, like the manifest, css, images, ... are kept in one place.

## Environment variables
| Name | Example value | Description | Required? |
| ---- | ------------- | ----------- | -------- |
| POSTGRES_PASSWORD | secret | Password to log in to the database | required
| JAVA_OPTS_PORTAL_FRONT_END | -Xmx400m -Xms400m | Java opts you want to pass to the JVM | optional
