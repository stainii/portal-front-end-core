package be.stijnhooft.portal.core.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Data
public class ModuleDTO {

    private String name;

    /** Path to the index page.  **/
    private String url;

    /** if true, the module shows by default when opening the app **/
    private boolean openByDefault;

    /** Position of the module in the list of modules.
     * The lower the number, the higher the module must appear in a menu. **/
    private int position;
}
