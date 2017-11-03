import EventEmitter from "event-emitter-es6";

class GlobalServiceFactory {

    createGlobalServices(window) {
        window.events = new EventEmitter();
    };

}

export default GlobalServiceFactory;
