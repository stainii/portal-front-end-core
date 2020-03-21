package be.stijnhooft.portal.frontend.services;

import be.stijnhooft.portal.frontend.dtos.ModuleDto;
import be.stijnhooft.portal.frontend.exceptions.ModuleCollectionNotFoundException;
import be.stijnhooft.portal.frontend.mappers.ModuleMapper;
import be.stijnhooft.portal.frontend.model.Module;
import be.stijnhooft.portal.frontend.model.ModuleCollection;
import be.stijnhooft.portal.frontend.repositories.ModuleCollectionRepository;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class ModuleServiceTest {

    @InjectMocks
    private ModuleService moduleService;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Mock
    private ModuleCollectionRepository moduleCollectionRepository;

    @Mock
    private ModuleMapper moduleMapper;

    @Mock
    private ModuleCollection moduleCollection;


    private Module module1;
    private Module module2;
    private ModuleDto moduleDto1;
    private ModuleDto moduleDto2;
    private List<ModuleDto> moduleDtos;

    @Before
    public void init() {
        module1 = new Module("module1",  true);
        module2 = new Module("module2",  false);
        moduleDto1 = new ModuleDto("module1", true, 0);
        moduleDto2 = new ModuleDto("module2",  false, 1);
        moduleDtos = Arrays.asList(moduleDto1, moduleDto2);
    }

    @Test
    public void findForUserWhenNothingFound() {
        //mock
        doReturn(Optional.empty()).when(moduleCollectionRepository).findForUser("test");

        //expect exception
        expectedException.expect(ModuleCollectionNotFoundException.class);
        expectedException.expectMessage("No module collection for user test found");

        //execute
        moduleService.findForUser("test");

        //verify
        verify(moduleCollectionRepository).findForUser("test");
        verifyNoMoreInteractions(moduleCollectionRepository, moduleCollection, moduleMapper);
    }

    @Test
    public void findAllWhenSuccess() {
        //data set
        List<ModuleDto> modules = Arrays.asList(moduleDto1, moduleDto2);

        //mock
        doReturn(Optional.of(moduleCollection)).when(moduleCollectionRepository).findForUser("test");
        doReturn(modules).when(moduleMapper).map(moduleCollection);

        //execute
        moduleService.findForUser("test");

        //assert and verify
        verify(moduleCollectionRepository).findForUser("test");
        verify(moduleMapper).map(moduleCollection);
        verifyNoMoreInteractions(moduleCollectionRepository, moduleCollection, moduleMapper);
    }

}
