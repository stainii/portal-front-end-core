package be.stijnhooft.portal.core.services;

import be.stijnhooft.portal.core.model.ModuleCollection;
import be.stijnhooft.portal.core.repositories.ModuleCollectionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

@Service
@Transactional
public class ModuleCollectionService {

    private final ModuleCollectionRepository moduleCollectionRepository;

    @Inject
    public ModuleCollectionService(ModuleCollectionRepository moduleCollectionRepository) {
        this.moduleCollectionRepository = moduleCollectionRepository;
    }

    /** Creates a default module collection. This method should only be called
     * when the application is ran for the very first time on a clean database.
     * @return the created initial default module
     */
    public ModuleCollection createInitialDefault() {
        ModuleCollection moduleCollection =
                new ModuleCollection("default", true);
        return moduleCollectionRepository.create(moduleCollection);
    }
}
