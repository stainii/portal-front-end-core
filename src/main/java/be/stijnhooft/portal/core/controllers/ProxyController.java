package be.stijnhooft.portal.core.controllers;

import be.stijnhooft.portal.core.services.ProxyService;
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
@RequestMapping("/portal/module/")
public class ProxyController {

    private final ProxyService proxyService;

    @Inject
    public ProxyController(ProxyService proxyService) {
        this.proxyService = proxyService;
    }

    @RequestMapping("/**")
    public ResponseEntity<String> findAll(HttpServletRequest request) {
        String requestedUrl = request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();
        Optional<String> actualUrl = proxyService.searchRealUrl(requestedUrl);
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
