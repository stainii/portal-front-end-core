package be.stijnhooft.portal.frontend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Data
public class ModuleDto {

    private String name;

    /** if true, the module shows by default when opening the app **/
    private boolean openByDefault;

    /** Position of the module in the list of modules.
     * The lower the number, the higher the module must appear in a menu. **/
    private int position;
}
