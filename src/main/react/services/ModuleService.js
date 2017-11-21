import ApiService from "./ApiService";

class ModuleService {

    constructor() {
        this.apiService = new ApiService();
    }

    findModules() {
        return this.apiService.getJson("/api/module/");
    };

}

export default ModuleService;