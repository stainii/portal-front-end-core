package be.stijnhooft.portal.core.services;

import be.stijnhooft.portal.core.model.Module;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

/**
 * Service which acts like a cache for configuration defined in the Config module.
 * Via annotations, the Spring Boot Config Client framework will sync this data.
 *
 * In order to update the cache, do a POST to the refresh url, defined by the
 * Spring actuator framework.
 */
@Configuration
@EnableConfigurationProperties(ConfigurationService.class)
@ConfigurationProperties
@Data
@RefreshScope
public class ConfigurationService {

    private List<Module> modules = new ArrayList<>();
}
