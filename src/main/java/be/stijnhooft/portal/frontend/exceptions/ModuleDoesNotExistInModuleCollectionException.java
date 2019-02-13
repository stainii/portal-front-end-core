package be.stijnhooft.portal.frontend.exceptions;

import be.stijnhooft.portal.frontend.model.Module;
import be.stijnhooft.portal.frontend.model.ModuleCollection;

public class ModuleDoesNotExistInModuleCollectionException extends RuntimeException {
    public ModuleDoesNotExistInModuleCollectionException(Module module, ModuleCollection moduleCollection) {
        super(String.format("Provided module %s does not exist for module collection of user %s", module.getName(), moduleCollection.getUser()));
    }
}
