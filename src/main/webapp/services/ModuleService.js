import ApiService from "./ApiService";
import _ from "lodash";

class ModuleService {

    constructor() {
        this.apiService = new ApiService();
    }

    loadRemoteModules() {
        const self = this;
        return this.apiService.getJson("/portal/core/api/module/")
            .then(modules => {
                return Promise.all(
                    _.map(modules, function (module) {
                        console.log(module.name, module.js, module.css);
                        return self._loadRemoteModule(module);
                    })
                );
            });
    };

    _loadRemoteModule(module) {
        const loadJS = new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();

            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    const remoteModuleSrc = request.responseText;
                    window.eval(remoteModuleSrc);
                    return resolve();
                } else {
                    return reject();
                }
            };

            request.open('GET', module.js);
            request.send();
        });

        const loadCSS = new Promise(function (resolve, reject) {
            const link = document.createElement("link");
            link.href = module.css;
            link.type = "text/css";
            link.rel = "stylesheet";
            link.media = "screen,print";

            document.getElementsByTagName("head")[0].appendChild(link);

            return resolve();
        });

        return Promise.all([
            loadJS,
            loadCSS
        ]).then(() => {
            module.component = { name: eval(module.name), props: module.props || {}};
            return module;
        });
    };

}

export default ModuleService;