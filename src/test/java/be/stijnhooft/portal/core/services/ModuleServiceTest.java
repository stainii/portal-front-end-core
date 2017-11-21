package be.stijnhooft.portal.core.services;

import be.stijnhooft.portal.core.dtos.ModuleDTO;
import be.stijnhooft.portal.core.mappers.ModuleMapper;
import be.stijnhooft.portal.core.model.Module;
import be.stijnhooft.portal.core.model.ModuleCollection;
import be.stijnhooft.portal.core.repositories.ModuleCollectionRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class ModuleServiceTest {

    @InjectMocks
    private ModuleService moduleService;

    @Mock
    private ConfigurationService configurationService;

    @Mock
    private ModuleCollectionRepository moduleCollectionRepository;
    
    @Mock
    private ModuleMapper moduleMapper;

    @Mock
    private ModuleCollection moduleCollection;

    @Mock
    private ModuleCollectionService moduleCollectionService;

    private Module module1;
    private Module module2;
    private ModuleDTO moduleDTO1;
    private ModuleDTO moduleDTO2;
    private List<ModuleDTO> moduleDTOs;

    @Before
    public void init() {
        module1 = new Module("module1",  "http://localhost:3000/");
        module2 = new Module("module2",  "http://localhost:3000/");
        moduleDTO1 = new ModuleDTO("module1", "http://localhost:3000/", 0);
        moduleDTO2 = new ModuleDTO("module2",  "http://localhost:3000/", 1);
        moduleDTOs = Arrays.asList(moduleDTO1, moduleDTO2);
    }

    @Test(expected = IllegalStateException.class)
    public void findAllWhenNoDefaultModuleCollectionHasBeenDefined() {
        //mock
        doReturn(Optional.empty()).when(moduleCollectionRepository).findDefault();

        //execute
        moduleService.findAll();

        //verify
        verify(moduleCollectionRepository).findDefault();
        verifyNoMoreInteractions(moduleCollectionRepository, moduleCollection, moduleMapper, moduleCollectionService);
    }

    @Test
    public void findAllWhenSuccess() {
        //data set
        List<ModuleDTO> modules = Arrays.asList(moduleDTO1, moduleDTO2);

        //mock
        doReturn(Optional.of(moduleCollection)).when(moduleCollectionRepository).findDefault();
        doReturn(modules).when(moduleMapper).map(moduleCollection);

        //execute
        moduleService.findAll();

        //assert and verify
        verify(moduleCollectionRepository).findDefault();
        verify(moduleMapper).map(moduleCollection);
        verifyNoMoreInteractions(moduleCollectionRepository, moduleCollection, moduleMapper, moduleCollectionService);
    }

    @Test
    public void syncModulesWhenNoModulesAreProvidedAndNoModulesAreInTheDatabase() {
        //mock
        doReturn(new ArrayList<>()).when(configurationService).getModules();

        //execute
        moduleService.syncModules();

        //assert and verify
        verify(configurationService).getModules();
        verifyNoMoreInteractions(configurationService, moduleCollectionRepository, moduleCollection, moduleMapper, moduleCollectionService);
    }

    @Test
    public void syncModulesWhenNoModulesAreRegisteredInTheDatabase() {
        //mock
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();
        doReturn(Optional.of(moduleCollection)).when(moduleCollectionRepository).findDefault();

        doReturn(Optional.empty()).when(moduleCollection).findModuleByName("module1");
        doReturn(module1).when(moduleCollection).add(module1);

        doReturn(Optional.empty()).when(moduleCollection).findModuleByName("module2");
        doReturn(module2).when(moduleCollection).add(module2);

        doReturn(moduleDTOs).when(moduleMapper).map(moduleCollection);
        doReturn(Arrays.asList(module1, module2)).when(moduleCollection).getModulesInOrder();

        //execute
        moduleService.syncModules();

        //assert and verify
        verify(configurationService).getModules();
        verify(moduleCollectionRepository).findDefault();
        verify(moduleCollection, times(2)).findModuleByName("module1");
        verify(moduleCollection).add(module1);
        verify(moduleCollection, times(2)).findModuleByName("module2");
        verify(moduleCollection).add(module2);
        verify(moduleCollection).getModulesInOrder();
        verifyNoMoreInteractions(configurationService, moduleCollectionRepository, moduleCollection, moduleMapper, moduleCollectionService);
    }

    @Test
    public void syncModulesWhenNotAddingNorUpdatingNewModules() {
        //mock
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();
        doReturn(Optional.of(moduleCollection)).when(moduleCollectionRepository).findDefault();
        doReturn(Optional.of(module1)).when(moduleCollection).findModuleByName("module1");
        doReturn(Optional.of(module2)).when(moduleCollection).findModuleByName("module2");
        doReturn(moduleDTOs).when(moduleMapper).map(moduleCollection);
        doReturn(Arrays.asList(module1, module2)).when(moduleCollection).getModulesInOrder();

        //execute
        moduleService.syncModules();

        //assert and verify
        verify(configurationService).getModules();
        verify(moduleCollectionRepository).findDefault();
        verify(moduleCollection, times(2)).findModuleByName("module1");
        verify(moduleCollection, times(2)).findModuleByName("module2");
        verify(moduleCollection).getModulesInOrder();
        verifyNoMoreInteractions(configurationService, moduleCollectionRepository, moduleCollection, moduleMapper, moduleCollectionService);
    }

    @Test
    public void syncModulesWhenAddingNewModules() {
        //mock
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();
        doReturn(Optional.of(moduleCollection)).when(moduleCollectionRepository).findDefault();
        doReturn(Optional.empty()).when(moduleCollection).findModuleByName("module1");
        doReturn(module1).when(moduleCollection).add(module1);
        doReturn(Optional.of(module2)).when(moduleCollection).findModuleByName("module2");
        doReturn(moduleDTOs).when(moduleMapper).map(moduleCollection);
        doReturn(Arrays.asList(module1, module2)).when(moduleCollection).getModulesInOrder();

        //execute
        moduleService.syncModules();

        //assert and verify
        verify(configurationService).getModules();
        verify(moduleCollectionRepository).findDefault();
        verify(moduleCollection, times(2)).findModuleByName("module1");
        verify(moduleCollection).add(module1);
        verify(moduleCollection, times(2)).findModuleByName("module2");
        verify(moduleCollection).getModulesInOrder();
        verifyNoMoreInteractions(configurationService, moduleCollectionRepository, moduleCollection, moduleMapper, moduleCollectionService);

    }

    @Test
    public void syncModulesWhenUpdatingAModule() {
        //data set
        Module updatedModule1 = new Module("module1", "http://localhost:6000/");

        //mock
        doReturn(Arrays.asList(updatedModule1, module2)).when(configurationService).getModules();
        doReturn(Optional.of(moduleCollection)).when(moduleCollectionRepository).findDefault();

        doReturn(Optional.of(module1)).when(moduleCollection).findModuleByName("module1");
        doReturn(updatedModule1).when(moduleCollection).update(updatedModule1);

        doReturn(Optional.of(module2)).when(moduleCollection).findModuleByName("module2");

        doReturn(Arrays.asList(updatedModule1, module2)).when(moduleCollection).getModulesInOrder();

        //execute
        moduleService.syncModules();

        //assert and verify
        verify(configurationService).getModules();
        verify(moduleCollectionRepository).findDefault();
        verify(moduleCollection, times(2)).findModuleByName("module1");
        verify(moduleCollection).update(updatedModule1);
        verify(moduleCollection, times(2)).findModuleByName("module2");
        verify(moduleCollection).getModulesInOrder();
        verifyNoMoreInteractions(configurationService, moduleCollectionRepository, moduleCollection, moduleMapper, moduleCollectionService);
    }

    @Test
    public void syncModulesWhenRemovingAModule() {
        //data set

        //mock
        doReturn(Arrays.asList(module1)).when(configurationService).getModules();
        doReturn(Optional.of(moduleCollection)).when(moduleCollectionRepository).findDefault();
        doReturn(Optional.of(module1)).when(moduleCollection).findModuleByName("module1");
        doReturn(Arrays.asList(module1, module2)).when(moduleCollection).getModulesInOrder();

        //execute
        moduleService.syncModules();

        //assert and verify
        verify(configurationService).getModules();
        verify(moduleCollectionRepository).findDefault();
        verify(moduleCollection, times(2)).findModuleByName("module1");
        verify(moduleCollection).getModulesInOrder();
        verify(moduleCollection).remove(module2);
        verifyNoMoreInteractions(configurationService, moduleCollectionRepository, moduleCollection, moduleMapper, moduleCollectionService);
    }

    @Test
    public void syncModulesWhenNoDefaultElementCollectionHasBeenDefined() {
        doReturn(Arrays.asList(module1, module2)).when(configurationService).getModules();
        doReturn(Optional.empty()).when(moduleCollectionRepository).findDefault();
        doReturn(moduleCollection).when(moduleCollectionService).createInitialDefault();

        doReturn(Optional.empty()).when(moduleCollection).findModuleByName("module1");
        doReturn(module1).when(moduleCollection).add(module1);

        doReturn(Optional.empty()).when(moduleCollection).findModuleByName("module2");
        doReturn(module2).when(moduleCollection).add(module2);

        doReturn(moduleDTOs).when(moduleMapper).map(moduleCollection);
        doReturn(Arrays.asList(module1, module2)).when(moduleCollection).getModulesInOrder();

        //execute
        moduleService.syncModules();

        verify(configurationService).getModules();
        verify(moduleCollectionRepository).findDefault();
        verify(moduleCollectionService).createInitialDefault();
        verify(moduleCollection, times(2)).findModuleByName("module1");
        verify(moduleCollection).add(module1);
        verify(moduleCollection, times(2)).findModuleByName("module2");
        verify(moduleCollection).add(module2);
        verify(moduleCollection).getModulesInOrder();
        verifyNoMoreInteractions(configurationService, moduleCollectionRepository, moduleCollection, moduleCollectionService);
    }

}