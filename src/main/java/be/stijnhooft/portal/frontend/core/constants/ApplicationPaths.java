package be.stijnhooft.portal.frontend.core.constants;

import java.util.Arrays;
import java.util.Collection;

/**
 * To support URL rewriting for Angular, every url will be rerouted to
 * the index page. To enable other services, for example the web service,
 * to be reachable, add the paths in this constant class.
 **/
public class ApplicationPaths {
    public static final String WEBSERVICE = "webservice/";

    public static Collection<String> urls() {
        return Arrays.asList(WEBSERVICE);
    }
}
