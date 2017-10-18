package be.stijnhooft.portal.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Startup point of the application.
 *
 * Either build this application as a jar, and run this main method,
 * or build this application as a war, and the {@link ServletInitializer}
 * will invoke this class.
 **/
@SpringBootApplication
@EnableTransactionManagement
public class PortalCore {
    public static void main(String[] args) {
        SpringApplication.run(PortalCore.class, args);
    }
}
