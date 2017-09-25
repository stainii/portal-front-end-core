import ConfigService from "./ConfigService";
import _ from "lodash";

class ModuleService {

    constructor() {
        this.configService = new ConfigService();
    }


    loadRemoteModule(module) {
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
            return { name: eval(module.name), props: module.props || {}}
        });
    };

    loadRemoteModules() {
        const self = this;
        return this.configService.loadConfiguration()
            .then(config => {
                return Promise.all(
                    _.map(config.modules, function (module) {
                        console.log(module.name, module.js, module.css);
                        return self.loadRemoteModule(module);
                    })
            );
        });
    };

}

export default ModuleService;