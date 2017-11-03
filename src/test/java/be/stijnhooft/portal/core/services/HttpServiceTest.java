package be.stijnhooft.portal.core.services;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class HttpServiceTest {

    private HttpService httpService;

    @Before
    public void init() {
        httpService = new HttpService();
    }

    @Test
    public void doesUrlExistWhenTrue() throws Exception {
        assertTrue(httpService.doesUrlExist("https://nl.wikipedia.org/static/images/project-logos/nlwiki.png"));
    }

    @Test
    public void doesUrlExistWhenFalse() throws Exception {
        assertFalse(httpService.doesUrlExist("https://nl.wikipedia.org/static/images/project-logos/stijn-is-de-beste.png"));
    }

}