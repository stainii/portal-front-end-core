package be.stijnhooft.portal.frontend.mappers;

import be.stijnhooft.portal.frontend.dtos.ModuleDTO;
import be.stijnhooft.portal.frontend.model.Module;
import be.stijnhooft.portal.frontend.model.ModuleCollection;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ModuleMapperTest {

    private ModuleMapper moduleMapper;

    @Before
    public void init() {
        moduleMapper = new ModuleMapper();
    }

    @Test(expected = NullPointerException.class)
    public void mapWhenModuleCollectionIsNull() throws Exception {
        moduleMapper.map((ModuleCollection) null);
    }

    @Test
    public void mapWhenModuleCollectionIsEmpty() throws Exception {
        List<ModuleDTO> moduleDTOs = moduleMapper.map(new ModuleCollection("test"));
        assertTrue(moduleDTOs.isEmpty());
    }

    @Test
    public void mapWhenModuleCollectionHasModules() throws Exception {
        ModuleCollection moduleCollection = new ModuleCollection("test");
        moduleCollection.add(new Module("test1", true));
        moduleCollection.add(new Module("test2", false));
        moduleCollection.add(new Module("test3", false));

        List<ModuleDTO> moduleDTOs = moduleMapper.map(moduleCollection);

        assertEquals(3, moduleDTOs.size());
        assertEquals(new ModuleDTO("test1", true, 0), moduleDTOs.get(0));
        assertEquals(new ModuleDTO("test2", false, 1), moduleDTOs.get(1));
        assertEquals(new ModuleDTO("test3", false, 2), moduleDTOs.get(2));
    }

}
