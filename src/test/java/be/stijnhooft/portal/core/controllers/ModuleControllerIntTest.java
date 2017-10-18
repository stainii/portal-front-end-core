package be.stijnhooft.portal.core.controllers;

import be.stijnhooft.portal.core.PortalCore;
import be.stijnhooft.portal.core.dtos.ModuleDTO;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import javax.inject.Inject;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = PortalCore.class)
@ActiveProfiles("local")
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class})
public class ModuleControllerIntTest {

    @Inject
    private ModuleController moduleController;

    @Test
    @DatabaseSetup("/datasets/ModuleController-findAll-initial.xml")
    @DatabaseTearDown("/datasets/clear.xml")
    public void findAll() throws Exception {
        List<ModuleDTO> expectedModules = Arrays.asList(
                new ModuleDTO("test1", "testjs1", "testcss1", 0),
                new ModuleDTO("test2", "testjs2", "testcss2", 1));

        List<ModuleDTO> actualModules = moduleController.findAll();

        assertEquals(expectedModules, actualModules);
    }

}