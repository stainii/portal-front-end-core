package be.stijnhooft.portal.frontend.core.servlets;

import be.stijnhooft.portal.frontend.core.services.GeneratedCodeService;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.http.HttpServlet;

public abstract class RetrieveAssembledCode extends HttpServlet {

    protected GeneratedCodeService getGeneratedCodeService() {
        WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
        return (GeneratedCodeService) webApplicationContext.getBean("generatedCodeService");
    }

}
