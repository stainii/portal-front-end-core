package be.stijnhooft.portal.frontend.mappers;

import be.stijnhooft.portal.frontend.dtos.ModuleDTO;
import be.stijnhooft.portal.frontend.model.Module;
import be.stijnhooft.portal.frontend.model.ModuleCollection;
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
            moduleDTOs.add(new ModuleDTO(module.getName(), module.isOpenByDefault(), i));
        }

        return moduleDTOs;
    }
}
