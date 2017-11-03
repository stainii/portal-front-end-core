package be.stijnhooft.portal.core.services;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.CacheConfiguration;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@ApplicationScope
@Slf4j
public class StaticFileProxyService {

    protected Cache<String, String> knownStaticFiles;

    private CacheManager cacheManager;
    private final ConfigurationService configurationService;
    private final HttpService httpService;

    @Inject
    public StaticFileProxyService(ConfigurationService configurationService, HttpService httpService) {
        this.configurationService = configurationService;
        this.httpService = httpService;
    }

    @PostConstruct
    public void init() {
        CacheConfiguration<String, String> configuration =
                CacheConfigurationBuilder
                        .newCacheConfigurationBuilder(String.class, String.class, ResourcePoolsBuilder.heap(10))
                        .withExpiry(Expirations.timeToIdleExpiration(Duration.of(14, TimeUnit.DAYS)))
                        .build();

        cacheManager = CacheManagerBuilder
                    .newCacheManagerBuilder()
                    .build(true);
        knownStaticFiles = cacheManager.createCache("knownStaticFiles", configuration);
    }

    @PreDestroy
    public void destroy() {
        cacheManager.close();
    }

    /**
     * Calls every registered module to see if it has the file to look for.
     * When there are multiple matches, a warning is logged and the first result is returned.
     *
     * When there is a match, this match is cached, for the lifetime of the current module.
     * When something is fetched from the cache, one last call is made to verify the file is
     * still there. If it's not, all modules will be queried and the non-existing item will be
     * removed from the cache.
     *
     * @param url the url, relative to this core module's root, which should actually exist relative to another module's
     *           static folder
     * @return the absolute path to the existing file. This can be used to send a http redirect status.
     */
    public Optional<String> searchStaticFile(@NonNull String url) {
        Optional<String> cachedResult = searchStaticFileInCache(url);

        if (cachedResult.isPresent()) {
            return cachedResult;
        } else {
            return searchStaticFileInAllModules(url);
        }
    }


    private Optional<String> searchStaticFileInCache(String url) {
        if (!knownStaticFiles.containsKey(url)) {
            return Optional.empty();
        }

        String cachedResult = knownStaticFiles.get(url);

        if (httpService.doesUrlExist(cachedResult)) {
            return Optional.of(cachedResult);
        } else {
            knownStaticFiles.remove(cachedResult);
            return Optional.empty();
        }
    }

    private Optional<String> searchStaticFileInAllModules(String url) {
            List<String> foundStaticFiles =
                    configurationService
                            .getModules()
                            .parallelStream()
                            .map((module) -> module.getContextRoot() + url)
                            .filter(httpService::doesUrlExist)
                            .collect(Collectors.toList());

            if (foundStaticFiles.size() > 1) {
                log.warn(String.format("Found multiple static resources for \"/s\": /s", url, foundStaticFiles));
            }

            if (foundStaticFiles.size() > 0) {
                String foundStaticFile = foundStaticFiles.get(0);
                knownStaticFiles.put(url, foundStaticFile);
                return Optional.of(foundStaticFile);
            } else {
                return Optional.empty();
            }
    }

}
