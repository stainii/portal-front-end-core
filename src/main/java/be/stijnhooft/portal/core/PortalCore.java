package be.stijnhooft.portal.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Startup point of the application.
 **/
@SpringBootApplication
@EnableTransactionManagement
@EnableEurekaClient
public class PortalCore {
    public static void main(String[] args) {
        SpringApplication.run(PortalCore.class, args);
    }
}
