package be.stijnhooft.portal.core.exceptions;

import be.stijnhooft.portal.core.model.Module;
import be.stijnhooft.portal.core.model.ModuleCollection;

public class ModuleDoesNotExistInModuleCollectionException extends RuntimeException {
    public ModuleDoesNotExistInModuleCollectionException(Module module, ModuleCollection moduleCollection) {
        super(String.format("Provided module %s does not exist for Module Collection %s", module.getName(), moduleCollection.getName()));
    }
}