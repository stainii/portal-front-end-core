package be.stijnhooft.portal.frontend.core.services;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;

public class FileServiceTest {

    @Test
    public void readResource() throws Exception {
        FileService fileService = new FileService();
        List<String> contents = fileService.readResource("test.txt");
        assertEquals("Hello world. This is me.", contents.get(0));
        assertEquals("Life should be fun for everyone.", contents.get(1));
    }

}