package be.stijnhooft.portal.core.model;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.persistence.Embeddable;

@Embeddable
@ToString
@EqualsAndHashCode
@ConfigurationProperties("module")
@NoArgsConstructor
@AllArgsConstructor
@Data   //setters needed to support Spring Boot Config Client. Please avoid using them.
public class Module {

    /** Name of the module. Must be unique **/
    private String name;

    /** Path to the bundled js file. Not saved  **/
    private String js;

    /** Path to the css file **/
    private String css;

    /** Path to the context root of the module. **/
    private String contextRoot;


}
