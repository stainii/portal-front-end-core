package be.stijnhooft.portal.frontend.core.filters;

import be.stijnhooft.portal.frontend.core.constants.ApplicationPaths;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")
@Slf4j
public class RewriteUrlForAngular implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("Initialized RewriteUrlForAngular filter");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (!(request instanceof HttpServletRequest)) {
            return;
        }
        HttpServletRequest req = (HttpServletRequest) request;

        if (anotherPartOfTheApplicationIsCalled(req) ||
                staticContentIsRequested(req)) {
            letTheCallPassThrough(request, response, chain);
        } else {
            rerouteTheCallToTheIndexPage(req, response, req);
        }
    }

    @Override
    public void destroy() {
        log.info("Stopped RewriteUrlForAngular filter");
    }


    private boolean anotherPartOfTheApplicationIsCalled(HttpServletRequest req) {
        String url = req.getServletPath();
        for (String path : ApplicationPaths.urls()) {
            if (url.startsWith("/" + path)) {
                return true;
            }
        }
        return false;
    }

    private boolean staticContentIsRequested(HttpServletRequest req) {
        String url = req.getServletPath();
        return url.contains(".");
    }

    private void rerouteTheCallToTheIndexPage(HttpServletRequest request, ServletResponse response, HttpServletRequest req) throws ServletException, IOException {
        String indexPage = "index.html";
        log.info("Rerouting request: " + request.getServletPath() + " -> " + indexPage);
        req.getRequestDispatcher(indexPage).forward(request, response);
    }

    private void letTheCallPassThrough(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        chain.doFilter(request, response);
    }
}
