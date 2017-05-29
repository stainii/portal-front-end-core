package be.stijnhooft.portal.frontend.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.support.DefaultConversionService;

@SpringBootApplication
public class PortalFrontEndCoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortalFrontEndCoreApplication.class, args);
	}

    /** Makes it possible to inject a list of strings from the config module.
     * See https://stackoverflow.com/questions/12576156/reading-a-list-from-properties-file-and-load-with-spring-annotation-value
     */
	@Bean
	public ConversionService conversionService() {
		return new DefaultConversionService();
	}
}
