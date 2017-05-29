package be.stijnhooft.portal.frontend.core.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;

import java.util.List;

@RefreshScope
@Service
public class ModuleService {

    @Value("${modules}")
    private List<String> modules;

    public List<String> findModules() {
        return this.modules;

    }
}
