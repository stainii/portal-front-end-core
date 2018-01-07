package be.stijnhooft.portal.core.mappers;

import be.stijnhooft.portal.core.dtos.ModuleDTO;
import be.stijnhooft.portal.core.model.Module;
import be.stijnhooft.portal.core.model.ModuleCollection;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ModuleMapper extends Mapper<ModuleCollection, List<ModuleDTO>> {

    @Override
    public List<ModuleDTO> map(@NonNull ModuleCollection moduleCollection) {
        List<ModuleDTO> moduleDTOs = new ArrayList<>();
        List<Module> modules = moduleCollection.getModulesInOrder();

        for (int i = 0; i < modules.size(); i++) {
            Module module = modules.get(i);
            moduleDTOs.add(new ModuleDTO(module.getName(), module.getUrl(), module.isOpenByDefault(), i));
        }

        return moduleDTOs;
    }
}
