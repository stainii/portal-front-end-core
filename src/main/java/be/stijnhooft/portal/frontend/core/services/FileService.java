package be.stijnhooft.portal.frontend.core.services;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class FileService {

    public List<String> readResource(String path) throws IOException {
        ClassLoader classLoader = this.getClass().getClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream(path);
        return IOUtils.readLines(resourceAsStream, "UTF-8");
    }
}
