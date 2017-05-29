package be.stijnhooft.portal.frontend.core.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class CodeAssemblerServiceTest {

    @InjectMocks
    private CodeAssemblerService codeAssemblerService;

    @Mock
    private ModuleService moduleService;

    @Mock
    private GeneratedCodeService generatedCodeService;

    @Mock
    private FileService fileService;

    @Test
    public void init() throws Exception {
        //data set
        List<String> modules = Arrays.asList(
                "portfolio/article-writer",
                "portfolio/analytics",
                "todo");

        List<String> appCoreJS = Arrays.asList(
                "<script>",
                "console.log('yow world!');",
                "</script>");

        List<String> appCoreCSS = Arrays.asList(
                "h1 {",
                "color: red;",
                "}");

        //mock
        doReturn(modules).when(moduleService).findModules();
        doReturn(appCoreJS).when(fileService).readResource(CodeAssemblerService.APP_CORE_JS);
        doReturn(appCoreCSS).when(fileService).readResource(CodeAssemblerService.APP_CORE_CSS);

        //execute
        codeAssemblerService.init();

        //verify
        verify(moduleService).findModules();
        verify(fileService).readResource(CodeAssemblerService.APP_CORE_JS);
        verify(generatedCodeService).setAppJS("<script>console.log('yow world!');</script>");
        verify(fileService).readResource(CodeAssemblerService.APP_CORE_CSS);
        verify(generatedCodeService).setAppCSS("h1 {color: red;}");
        verifyNoMoreInteractions(moduleService, fileService, generatedCodeService);
    }

}