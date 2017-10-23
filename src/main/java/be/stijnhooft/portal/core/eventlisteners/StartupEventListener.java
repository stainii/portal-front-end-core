package be.stijnhooft.portal.core.eventlisteners;

import be.stijnhooft.portal.core.services.ModuleService;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

/**
 * This event listener will initialize services right after the whole context is loaded.
 * In Spring, the @PostConstruct method cannot use a transaction. That's why
 * the annotation cannot always be used.
 */
@Component
public class StartupEventListener implements ApplicationListener<ContextRefreshedEvent> {

    private final ModuleService moduleService;

    @Inject
    public StartupEventListener(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    public void onApplicationEvent(ContextRefreshedEvent event) {
        moduleService.syncModules();
    }
}
