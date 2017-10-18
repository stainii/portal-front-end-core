package be.stijnhooft.portal.core.repositories;

import be.stijnhooft.portal.core.PortalCore;
import be.stijnhooft.portal.core.model.ModuleCollection;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import com.github.springtestdbunit.annotation.ExpectedDatabase;
import com.github.springtestdbunit.assertion.DatabaseAssertionMode;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = PortalCore.class)
@ActiveProfiles("local")
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class})
public class ModuleCollectionRepositoryIntTest {

    @Inject
    private ModuleCollectionRepository repository;

    @Test
    @DatabaseSetup("/datasets/ModuleCollectionRepositoryTest-findDefaultWhenSuccess-initial.xml")
    @DatabaseTearDown("/datasets/clear.xml")
    public void findDefaultWhenSuccess() {
        Optional<ModuleCollection> defaultModuleCollection = repository.findDefault();
        assertTrue(defaultModuleCollection.isPresent());
        assertEquals(1, defaultModuleCollection.get().getId());
    }

    @Test
    @DatabaseSetup("/datasets/ModuleCollectionRepositoryTest-findDefaultWhenNoDefaultDefined-initial.xml")
    @DatabaseTearDown("/datasets/clear.xml")
    public void findDefaultWhenNoDefaultDefined() {
        Optional<ModuleCollection> defaultModuleCollection = repository.findDefault();
        assertFalse(defaultModuleCollection.isPresent());
    }

    @Test
    @DatabaseSetup("/datasets/ModuleCollectionRepositoryTest-create-initial.xml")
    @ExpectedDatabase(value = "/datasets/ModuleCollectionRepositoryTest-create-expected.xml", assertionMode = DatabaseAssertionMode.NON_STRICT)
    @DatabaseTearDown("/datasets/clear.xml")
    @Transactional
    public void create() {
        repository.flush();
        ModuleCollection moduleCollection = new ModuleCollection("test", false);
        moduleCollection = repository.create(moduleCollection);
        repository.flush();
        assertNotNull(moduleCollection);
    }
}