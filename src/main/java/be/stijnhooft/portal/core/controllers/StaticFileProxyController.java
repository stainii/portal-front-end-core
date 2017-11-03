package be.stijnhooft.portal.core.controllers;

import be.stijnhooft.portal.core.services.StaticFileProxyService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/static/")
public class StaticFileProxyController {

    private final StaticFileProxyService staticFileProxyService;

    @Inject
    public StaticFileProxyController(StaticFileProxyService staticFileProxyService) {
        this.staticFileProxyService = staticFileProxyService;
    }

    @RequestMapping("/**")
    public ResponseEntity<String> findAll(HttpServletRequest request) {
        String requestedUrl = request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();
        Optional<String> actualUrl = staticFileProxyService.searchStaticFile(requestedUrl);
        if (actualUrl.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.TEMPORARY_REDIRECT)
                    .header(HttpHeaders.LOCATION, actualUrl.get())
                    .build();
        } else {
            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

}
