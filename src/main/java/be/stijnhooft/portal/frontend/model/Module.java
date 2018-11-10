package be.stijnhooft.portal.frontend.model;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Module {

    /** Name of the module. Must be unique **/
    private String name;

    /** if true, the module shows by default when opening the app **/
    private boolean openByDefault;

}
