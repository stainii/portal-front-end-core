package be.stijnhooft.portal.core.controllers;

import be.stijnhooft.portal.core.dtos.ModuleDTO;
import be.stijnhooft.portal.core.services.ModuleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

@RestController
@RequestMapping("/api/module")
public class ModuleController {

    private final ModuleService moduleService;

    @Inject
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @RequestMapping("/")
    public List<ModuleDTO> findAll() {
        return moduleService.findAll();
    }

}
