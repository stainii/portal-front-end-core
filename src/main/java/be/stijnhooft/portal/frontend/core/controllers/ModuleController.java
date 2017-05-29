package be.stijnhooft.portal.frontend.core.controllers;

import be.stijnhooft.portal.frontend.core.constants.ApplicationPaths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApplicationPaths.WEBSERVICE + "/modules")
@RefreshScope
public class ModuleController {


    @Value("${modules}")
    private List<String> modules;

    @RequestMapping(method = RequestMethod.GET)
    public List<String> findModules() {
        return this.modules;

    }
}
