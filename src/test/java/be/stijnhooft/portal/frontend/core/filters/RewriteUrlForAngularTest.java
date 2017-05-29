package be.stijnhooft.portal.frontend.core.filters;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class RewriteUrlForAngularTest {

    @InjectMocks
    private RewriteUrlForAngular rewriteUrlForAngular;

    @Mock
    private HttpServletRequest request;

    @Mock
    private ServletResponse response;

    @Mock
    private FilterChain chain;

    @Mock
    private RequestDispatcher requestDispatcher;

    @Test
    public void doFilterWhenWebserviceIsCalled() throws Exception {
        //mock
        doReturn("/webservice/test").when(request).getServletPath();

        //execute
        rewriteUrlForAngular.doFilter(request, response, chain);

        //verify
        verify(request, times(1)).getServletPath();
        verify(chain).doFilter(request, response);
        verifyNoMoreInteractions(request, chain, requestDispatcher);
    }

    @Test
    public void doFilterWhenTheFrontendIsCalled() throws Exception {
        //mock
        doReturn("/about").when(request).getServletPath();
        doReturn(requestDispatcher).when(request).getRequestDispatcher("index.html");

        //execute
        rewriteUrlForAngular.doFilter(request, response, chain);

        //verify
        verify(request, times(3)).getServletPath();
        verify(request).getRequestDispatcher("index.html");
        verify(requestDispatcher).forward(request, response);
        verifyNoMoreInteractions(request, chain, requestDispatcher);
    }

    @Test
    public void doFilterWhenStaticContentIsRequested() throws Exception {
        //mock
        doReturn("/img/test.jpg").when(request).getServletPath();

        //execute
        rewriteUrlForAngular.doFilter(request, response, chain);

        //verify
        verify(request, times(2)).getServletPath();
        verify(chain).doFilter(request, response);
        verifyNoMoreInteractions(request, chain, requestDispatcher);
    }

}