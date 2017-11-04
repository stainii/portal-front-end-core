package be.stijnhooft.portal.core.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import javax.inject.Inject;
import java.util.Optional;

@Service
@ApplicationScope
@Slf4j
public class ProxyService {

    private final ConfigurationService configurationService;

    @Inject
    public ProxyService(ConfigurationService configurationService) {
        this.configurationService = configurationService;
    }


    /**
     * Check which module the searched resource belongs to, and returns the real url.
     *
     * @param url the url, relative to this core module's root. This url should start
     *            with a slash, followed by context root of the module, followed by
     *            the path of the searched resource.
     * @return the absolute path to the existing resource. This can be used to send
     *          a http redirect status.
     */
    public Optional<String> searchRealUrl(@NonNull String url) {
        return configurationService
                    .getModules()
                    .stream()
                    .filter((module) -> url.startsWith(module.getContextRoot())
                            || url.startsWith(module.getContextRoot(), 1))
                    .findFirst()
                    .map((module) -> module.getHost() + url);
    }



}
