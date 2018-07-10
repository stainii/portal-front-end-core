package be.stijnhooft.portal.core.controllers;

import be.stijnhooft.portal.core.dtos.ModuleDTO;
import be.stijnhooft.portal.core.services.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<ModuleDTO> findAll() {
        return moduleService.findAll();
    }

}
