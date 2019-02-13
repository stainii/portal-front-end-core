package be.stijnhooft.portal.frontend.controllers;

import be.stijnhooft.portal.frontend.dtos.ModuleDTO;
import be.stijnhooft.portal.frontend.services.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/module")
public class ModuleController {

    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @RequestMapping("/")
    public List<ModuleDTO> findForLoggedInUser(Principal activeUser) {
        return moduleService.findForUser(activeUser.getName());
    }

}
