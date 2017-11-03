package be.stijnhooft.portal.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Startup point of the application.
 **/
@SpringBootApplication
@EnableTransactionManagement
public class PortalCore {
    public static void main(String[] args) {
        SpringApplication.run(PortalCore.class, args);
    }
}
