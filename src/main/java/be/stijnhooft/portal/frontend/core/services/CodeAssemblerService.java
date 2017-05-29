package be.stijnhooft.portal.frontend.core.services;

import be.stijnhooft.portal.frontend.core.exceptions.FrontEndServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CodeAssemblerService {

    public static final String APP_CORE_JS = "META-INF/resources/js/app-core.js";
    public static final String APP_CORE_CSS = "META-INF/resources/css/app-core.css";

    @Inject
    private ModuleService moduleService;

    @Inject
    private GeneratedCodeService generatedCodeService;

    @Inject
    private FileService fileService;

    @PostConstruct
    public void init() {
        assembleCodeOfAllModules();
    }

    /*@EventListener
    public void moduleConfigurationChangedEvent(ModuleConfigurationChanged event) {

    }*/

    private void assembleCodeOfAllModules() {
        log.info("Assembling the JavaScript and CSS of all modules");

        List<String> modules = moduleService.findModules();

        assembleJavaScriptOfAllModules(modules);
        assembleCSSOfAllModules(modules);
    }

    private void assembleJavaScriptOfAllModules(Collection<String> modules) {
        List<String> appJS = loadCoreJS();
        //TODO: load js other modules

        generatedCodeService.setAppJS(appJS.stream().collect(Collectors.joining()));
    }

    private void assembleCSSOfAllModules(Collection<String> modules) {
        List<String> appCSS = loadCoreCSS();
        //TODO: load css other modules

        generatedCodeService.setAppCSS(appCSS.stream().collect(Collectors.joining()));
    }

    private List<String> loadCoreJS() {
        try {
            return fileService.readResource(APP_CORE_JS);
        } catch (IOException e) {
            throw new FrontEndServiceException("Could not assemble app.css: could not load the core js", e);
        }
    }

    private List<String> loadCoreCSS() {
        try {
            return fileService.readResource(APP_CORE_CSS);
        } catch (IOException e) {
            throw new FrontEndServiceException("Could not assemble app.css: could not load the core css", e);
        }
    }
}
