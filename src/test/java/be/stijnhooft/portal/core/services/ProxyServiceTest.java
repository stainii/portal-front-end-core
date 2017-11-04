package be.stijnhooft.portal.core.services;

import be.stijnhooft.portal.core.model.Module;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class ProxyServiceTest {

    @InjectMocks
    private ProxyService service;

    @Mock
    private ConfigurationService configurationService;

    @Test
    public void searchRealUrlWhenContextPathIsRegisteredInTheConfiguration() throws Exception {
        //data set
        String urlToSearchFor = "module2/test.jpg";
        String hostOfModule = "http://localhost:8081/";

        Module module1 = new Module("module1", "js", "css", "http://localhost:8008/", "module1/");
        Module module2 = new Module("module2", "js", "css", hostOfModule, "module2/");

        //mock
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();

        Optional<String> actualResult = service.searchRealUrl(urlToSearchFor);

        //verify and assert
        verify(configurationService).getModules();

        assertTrue(actualResult.isPresent());
        assertEquals(hostOfModule + urlToSearchFor, actualResult.get());
    }

    @Test
    public void searchRealUrlWhenContextPathIsNotRegisteredInTheConfiguration() throws Exception {
        //data set
        String urlToSearchFor = "module3/test.jpg";

        Module module1 = new Module("module1", "js", "css", "http://localhost:8080/", "module1/");
        Module module2 = new Module("module2", "js", "css", "http://localhost:8081/", "module2/");

        //mock
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();

        Optional<String> actualResult = service.searchRealUrl(urlToSearchFor);

        //verify and assert
        verify(configurationService).getModules();

        assertFalse(actualResult.isPresent());
    }

    @Test(expected = NullPointerException.class)
    public void searchRealUrlWhenPassingNullArgument() throws Exception {
        service.searchRealUrl(null);
    }

}