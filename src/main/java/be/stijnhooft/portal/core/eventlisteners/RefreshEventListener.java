package be.stijnhooft.portal.core.eventlisteners;

import be.stijnhooft.portal.core.services.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.scope.refresh.RefreshScopeRefreshedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/** Event listener that is automatically activated and listens for a
 *  {@link org.springframework.cloud.context.scope.refresh.RefreshScopeRefreshedEvent}.
 *  This event is fired when data that has been cached should be updated,
 *  for example the configuration of the config module.
 */
@Component
public class RefreshEventListener implements ApplicationListener<RefreshScopeRefreshedEvent> {

    private final ModuleService moduleService;

    @Autowired
    public RefreshEventListener(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @Override
    public void onApplicationEvent(RefreshScopeRefreshedEvent event) {
        moduleService.syncModules();
    }
}
