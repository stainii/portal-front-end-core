# Portal-front-end

This application serves as the front-end for all modules of the portal.

## There is Java code in this module?
Although it's called the front-end, this module has both a Java (back-end) part and an Angular (front-end) part.

### The Java part
Although the name of this module would imply that this is a plain front-end module, still a little bit of back-end heavy lifting was necessary.

This back-end part is responsible to **manage user-specific front-end settings**, like: *"To which modules should the user have access?"*

### The Angular part

You can find the code under ``src/main/web``.

## How to build this project?
You have 2 options:

1. Build both the back-end and front-end with ``mvn clean install``.
1. Build the front-end only with ``npm run build`` or ``npm run build-prod``.


## A swift development workflow
During development of the front-end, I like to start the Java application to serve as a back-end, ignoring the front-end at port 2001.

Then, I use ``ng serve --open`` to start up another front-end on 4200. This front-end makes use of the backend at port 2001, so no mocking required. Still, I can adapt the code and watch the front-end reload live, allowing me to develop swiftly.


## The security system
### Naming conventions of modules and routes
Make sure that the route to your component is the same as the component name in lowercase.

For example: if I have a module with the name "Notifications", the route name to go to that module should be set up as "notifications".


## Using Angular CLI
In order to scaffold code, this project makes use of [Angular CLI](https://github.com/angular/angular-cli).

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
