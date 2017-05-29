package be.stijnhooft.portal.frontend.core.servlets;

import be.stijnhooft.portal.frontend.core.services.GeneratedCodeService;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * The front-end requires modules to be dynamically loaded.
 * The core module will retrieve the CSS of all necessary modules,
 * combine them and store the aggregated CSS in the generatedCodeService.
 * This servlet returns the aggregated CSS.
 */
@WebServlet(urlPatterns = "/css/app.css")
@Slf4j
public class RetrieveAssembledAppCSS extends RetrieveAssembledCode {

    @Override
    public void init() throws ServletException {
        super.init();
        log.info("Setting up RetrieveAssembledAppCSS servlet");
    }


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        GeneratedCodeService generatedCodeService = getGeneratedCodeService();
        String appCSS = generatedCodeService.getAppCSS();
        response.getWriter().write(appCSS);
    }

}
