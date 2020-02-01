package be.stijnhooft.portal.frontend.mappers;

import be.stijnhooft.portal.frontend.dtos.ModuleDto;
import be.stijnhooft.portal.frontend.model.Module;
import be.stijnhooft.portal.frontend.model.ModuleCollection;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ModuleMapper extends Mapper<ModuleCollection, List<ModuleDto>> {

    @Override
    public List<ModuleDto> map(@NonNull ModuleCollection moduleCollection) {
        List<ModuleDto> moduleDtos = new ArrayList<>();
        List<Module> modules = moduleCollection.getModulesInOrder();

        for (int i = 0; i < modules.size(); i++) {
            Module module = modules.get(i);
            moduleDtos.add(new ModuleDto(module.getName(), module.isOpenByDefault(), i));
        }

        return moduleDtos;
    }

}
