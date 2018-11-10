package be.stijnhooft.portal.frontend.exceptions;

public class ModuleCollectionNotFoundException extends RuntimeException {
    public ModuleCollectionNotFoundException(String user) {
        super(String.format("No module collection for user %s found", user));
    }
}
