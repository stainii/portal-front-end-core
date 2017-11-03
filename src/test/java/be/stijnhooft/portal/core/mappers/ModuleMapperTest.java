package be.stijnhooft.portal.core.mappers;

import be.stijnhooft.portal.core.dtos.ModuleDTO;
import be.stijnhooft.portal.core.model.Module;
import be.stijnhooft.portal.core.model.ModuleCollection;
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
        List<ModuleDTO> moduleDTOs = moduleMapper.map(new ModuleCollection("test", true));
        assertTrue(moduleDTOs.isEmpty());
    }

    @Test
    public void mapWhenModuleCollectionHasModules() throws Exception {
        ModuleCollection moduleCollection = new ModuleCollection("test", true);
        moduleCollection.add(new Module("test1", "js", "css", "http://localhost:3000/module1"));
        moduleCollection.add(new Module("test2", "js", "css", "http://localhost:3000/module2"));
        moduleCollection.add(new Module("test3", "js", "css", "http://localhost:3000/module3"));

        List<ModuleDTO> moduleDTOs = moduleMapper.map(moduleCollection);

        assertEquals(3, moduleDTOs.size());
        assertEquals(new ModuleDTO("test1",  "js", "css", 0), moduleDTOs.get(0));
        assertEquals(new ModuleDTO("test2",  "js", "css", 1), moduleDTOs.get(1));
        assertEquals(new ModuleDTO("test3",  "js", "css", 2), moduleDTOs.get(2));


    }

}