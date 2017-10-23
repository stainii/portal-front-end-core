package be.stijnhooft.portal.core.services;

import be.stijnhooft.portal.core.dtos.ModuleDTO;
import be.stijnhooft.portal.core.mappers.ModuleMapper;
import be.stijnhooft.portal.core.model.Module;
import be.stijnhooft.portal.core.model.ModuleCollection;
import be.stijnhooft.portal.core.repositories.ModuleCollectionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.CollectionUtils.isEmpty;

@Service
@Transactional
@Slf4j
public class ModuleService {

    private final ConfigurationService configurationService;
    private final ModuleCollectionRepository moduleCollectionRepository;
    private final ModuleMapper moduleMapper;
    private final ModuleCollectionService moduleCollectionService;

    @Inject
    public ModuleService(ConfigurationService configurationService, ModuleCollectionRepository moduleCollectionRepository,
                         ModuleMapper moduleMapper, ModuleCollectionService moduleCollectionService) {
        this.configurationService = configurationService;
        this.moduleCollectionRepository = moduleCollectionRepository;
        this.moduleMapper = moduleMapper;
        this.moduleCollectionService = moduleCollectionService;
    }

    public List<ModuleDTO> findAll() {
        ModuleCollection moduleCollection =
                moduleCollectionRepository.findDefault()
                                          .orElseThrow(() -> new IllegalStateException("No module collection provided and no default module collection defined"));

        return moduleMapper.map(moduleCollection);
    }

    @Transactional
    public void syncModules() {
        List<Module> modules = configurationService.getModules();

        if (isEmpty(modules)) {
            log.error("No modules found in the config module. Did something go wrong? I will skip syncing.");
        } else {
            ModuleCollection moduleCollection =
                    moduleCollectionRepository.findDefault()
                                              .orElseGet(moduleCollectionService::createInitialDefault);

            updateExistingModules(modules, moduleCollection);
            persistNewModules(modules, moduleCollection);
            removeModulesWhichNoLongerExist(modules, moduleCollection);
        }
    }

    private void removeModulesWhichNoLongerExist(List<Module> modules, ModuleCollection moduleCollection) {
        moduleCollection.getModulesInOrder()
                .stream()
                .filter(possiblyRemovedModule -> {
                    return modules .stream()
                            .noneMatch(module -> module.getName().equalsIgnoreCase(possiblyRemovedModule.getName()));
                }).forEach(module -> moduleCollection.remove(module));
    }

    private void updateExistingModules(List<Module> modules, ModuleCollection moduleCollection) {
        modules.forEach((possiblyUpdatedModule) -> {
                    Optional<Module> existingModule = moduleCollection.findModuleByName(possiblyUpdatedModule.getName());
                    if (existingModule.isPresent() && !existingModule.get().equals(possiblyUpdatedModule)) {
                        moduleCollection.update(possiblyUpdatedModule);
                    }
                });
    }

    private void persistNewModules(List<Module> modules, ModuleCollection moduleCollection) {
        modules.stream()
                .filter(module -> !moduleCollection.findModuleByName(module.getName())
                                    .isPresent())
                .forEach(moduleCollection::add);
    }
}
