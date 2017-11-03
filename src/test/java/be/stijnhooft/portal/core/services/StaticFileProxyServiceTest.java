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
public class StaticFileProxyServiceTest {

    @InjectMocks
    private StaticFileProxyService service;

    @Mock
    private HttpService httpService;

    @Mock
    private ConfigurationService configurationService;

    @Test
    public void searchStaticFileWhenAlreadyInCacheAndUrlDoesStillExist() throws Exception {
        service.init();

        //data set
        String urlToSearchFor = "module1/test.jpg";
        String expectedResult = "cachedResult.jpg";

        service.knownStaticFiles.put(urlToSearchFor, expectedResult);

        //mock
        doReturn(true).when(httpService).doesUrlExist(expectedResult);

        //execute
        Optional<String> actualResult = service.searchStaticFile(urlToSearchFor);

        //verify and assert
        verify(httpService).doesUrlExist(expectedResult);

        assertTrue(actualResult.isPresent());
        assertEquals(expectedResult, actualResult.get());
    }

    @Test
    public void searchStaticFileWhenAlreadyInCacheButUrlDoesNoLongerExist() throws Exception {
        service.init();

        //data set
        String urlToSearchFor = "module1/test.jpg";
        String cachedResult = "cachedResult.jpg";

        service.knownStaticFiles.put(urlToSearchFor, cachedResult);

        //mock
        doReturn(false).when(httpService).doesUrlExist(cachedResult);

        //execute
        Optional<String> actualResult = service.searchStaticFile(urlToSearchFor);

        //verify and assert
        verify(httpService).doesUrlExist(cachedResult);

        assertFalse(actualResult.isPresent());
        assertFalse(service.knownStaticFiles.containsKey(cachedResult));
    }

    @Test
    public void searchStaticFileWhenNotInCacheAndASingleExistingUrlFound() throws Exception {
        service.init();

        //data set
        String urlToSearchFor = "static/module1/test.jpg";
        String expectedResult = "http://localhost:8008/module1/static/module1/test.jpg";

        Module module1 = new Module("module1", "js", "css", "http://localhost:8008/module1/");
        Module module2 = new Module("module1", "js", "css", "http://localhost:8008/module2/");

        //mock
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();
        doReturn(true).when(httpService).doesUrlExist("http://localhost:8008/module1/static/module1/test.jpg");
        doReturn(false).when(httpService).doesUrlExist("http://localhost:8008/module2/static/module1/test.jpg");

        //execute
        Optional<String> actualResult = service.searchStaticFile(urlToSearchFor);

        //verify and assert
        verify(configurationService).getModules();
        verify(httpService).doesUrlExist("http://localhost:8008/module1/static/module1/test.jpg");
        verify(httpService).doesUrlExist("http://localhost:8008/module2/static/module1/test.jpg");

        assertTrue(actualResult.isPresent());
        assertEquals(expectedResult, actualResult.get());
    }

    @Test
    public void searchStaticFileWhenNotInCacheAndMultipleExistingUrlsFound() throws Exception {
        service.init();

        //data set
        String urlToSearchFor = "static/module1/test.jpg";
        String expectedResult = "http://localhost:8008/module1/static/module1/test.jpg";

        Module module1 = new Module("module1", "js", "css", "http://localhost:8008/module1/");
        Module module2 = new Module("module1", "js", "css", "http://localhost:8008/module2/");

        //mock
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();
        doReturn(true).when(httpService).doesUrlExist("http://localhost:8008/module1/static/module1/test.jpg");
        doReturn(true).when(httpService).doesUrlExist("http://localhost:8008/module2/static/module1/test.jpg");

        //execute
        Optional<String> actualResult = service.searchStaticFile(urlToSearchFor);

        //verify and assert
        verify(configurationService).getModules();
        verify(httpService).doesUrlExist("http://localhost:8008/module1/static/module1/test.jpg");
        verify(httpService).doesUrlExist("http://localhost:8008/module2/static/module1/test.jpg");

        assertTrue(actualResult.isPresent());
        assertEquals(expectedResult, actualResult.get());
    }

    @Test
    public void searchStaticFileWhenNotInCacheAndNoExistingUrlFound() throws Exception {
        service.init();

        //data set
        String urlToSearchFor = "static/module1/test.jpg";

        Module module1 = new Module("module1", "js", "css", "http://localhost:8008/module1/");
        Module module2 = new Module("module1", "js", "css", "http://localhost:8008/module2/");

        //mock
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();
        doReturn(false).when(httpService).doesUrlExist("http://localhost:8008/module1/static/module1/test.jpg");
        doReturn(false).when(httpService).doesUrlExist("http://localhost:8008/module2/static/module1/test.jpg");

        //execute
        Optional<String> actualResult = service.searchStaticFile(urlToSearchFor);

        //verify and assert
        verify(configurationService).getModules();
        verify(httpService).doesUrlExist("http://localhost:8008/module1/static/module1/test.jpg");
        verify(httpService).doesUrlExist("http://localhost:8008/module2/static/module1/test.jpg");

        assertFalse(actualResult.isPresent());
    }

    @Test(expected = NullPointerException.class)
    public void searchStaticFileWhenPassingNullArgument() throws Exception {
        service.init();

        service.searchStaticFile(null);
    }

}